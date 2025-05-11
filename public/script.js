document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  const loading = document.getElementById("loading");

  searchForm.addEventListener("submit", (e) => {
    loading.style.display = "block";
  });
});
