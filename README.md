# Book Management System

A simple React Book Management System built with functional components, hooks, Fetch API, and a hosted mock CRUD API.

## Live Deployed URL

Add your deployed project URL here:

```text
https://booknest-tejaswini-260526.netlify.app
```

## Features

- View a list of books.
- Display each book's title, author, genre, and publication year.
- Add a new book.
- Update an existing book.
- Delete a book.
- Search books by title or author.
- Filter books by genre.
- Show loading and error messages for API requests.

## Folder Structure

```text
bookmanagement/
  db.json
  package.json
  README.md
  src/
    App.css
    App.jsx
    index.css
    main.jsx
    api/
      bookApi.js
    components/
      BookForm.jsx
      BookItem.jsx
      BookList.jsx
      SearchBar.jsx
```

## Hosted Mock API

The app is connected to a self-contained Netlify Function for CRUD operations:

```text
/.netlify/functions/books
```

The API base URL is configured in:

```text
src/api/bookApi.js
```

## Local Setup

Install dependencies:

```bash
npm install
```

Start the React app:

```bash
npm run dev
```

Open the local Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Optional Local Mock API

This project also includes `db.json` for JSON Server. To use it locally, start the mock API:

```bash
npm run api
```

Then change `API_URL` in `src/api/bookApi.js` to:

```text
http://localhost:3001/books
```

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment Guide

### Deploy to Vercel

1. Push the project to GitHub.
2. Open [Vercel](https://vercel.com).
3. Import the GitHub repository.
4. Use these settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Deploy the project.
6. Copy the generated live URL into this README.

### Deploy to Netlify

1. Push the project to GitHub.
2. Open [Netlify](https://www.netlify.com).
3. Import the GitHub repository.
4. Use these settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
5. Deploy the project.
6. Copy the generated live URL into this README.

## Important API Note

The Netlify Function stores data in memory, so it is perfect for a deployed mock CRUD demo. For a production app, replace it with a persistent database-backed API.
