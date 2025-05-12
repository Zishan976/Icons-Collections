document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  const loading = document.getElementById("loading");
  const searchInput = document.getElementById("search");
  const suggestionsContainer = document.getElementById("suggestions");

  searchForm.addEventListener("submit", (e) => {
    loading.style.display = "block";
  });

  // Function to clear suggestions
  function clearSuggestions() {
    suggestionsContainer.innerHTML = "";
    suggestionsContainer.style.display = "none";
  }

  // Function to create suggestion item
  function createSuggestionItem(text) {
    const div = document.createElement("div");
    div.classList.add("suggestion-item");
    div.setAttribute("role", "option");
    div.textContent = text;
    div.tabIndex = 0;
    div.addEventListener("click", () => {
      searchInput.value = text;
      clearSuggestions();
      searchInput.focus();
      // Submit the form automatically on suggestion click
      searchForm.submit();
    });
    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        div.click();
      }
    });
    return div;
  }

  // Debounce function to limit API calls
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Fetch suggestions from server
  async function fetchSuggestions(query) {
    if (!query) {
      clearSuggestions();
      return;
    }
    try {
      const response = await fetch(
        `/suggestions?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        clearSuggestions();
        return;
      }
      const suggestions = await response.json();
      if (suggestions.length === 0) {
        clearSuggestions();
        return;
      }
      suggestionsContainer.innerHTML = "";
      suggestions.forEach((suggestion) => {
        const item = createSuggestionItem(suggestion);
        suggestionsContainer.appendChild(item);
      });
      suggestionsContainer.style.display = "block";
    } catch (error) {
      clearSuggestions();
    }
  }

  const debouncedFetch = debounce(fetchSuggestions, 300);

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    debouncedFetch(query);
  });

  // Hide suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!suggestionsContainer.contains(e.target) && e.target !== searchInput) {
      clearSuggestions();
    }
  });
});
