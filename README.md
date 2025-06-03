# Icon Collection

## Description

Icon Collection is a web application that allows users to search for icons by keyword. It integrates with the Noun Project API to fetch and display a variety of icons based on user queries. The application features autocomplete suggestions to enhance the search experience and provides a clean, responsive user interface.

The website is deployed and accessible at: [https://icons-collections.onrender.com](https://icons-collections.onrender.com)

## Features

- Search for icons by keyword
- Autocomplete suggestions for search terms
- Display of icon thumbnails with attribution
- Responsive design for various screen sizes
- Error handling for API request failures

## Technologies Used

- Node.js
- Express.js
- EJS templating engine
- OAuth 1.0a for API authentication
- Axios for HTTP requests
- Client-side JavaScript for interactivity
- CSS for styling

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd icons-Collection
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your Noun Project API credentials:
   ```
   NOUN_PROJECT_KEY=your_key_here
   NOUN_PROJECT_SECRET=your_secret_here
   PORT=3000
   ```
5. Start the server:
   ```
   npm start
   ```

## Usage

- Open your browser and go to `http://localhost:3000`.
- Enter a keyword in the search box to find icons.
- Use the autocomplete suggestions to quickly select search terms.
- View the icons displayed with their respective attributions.

## API Integration

This application uses the Noun Project API to fetch icon data. OAuth 1.0a is used for secure authentication with the API.

## License

This project is licensed under the MIT License.
