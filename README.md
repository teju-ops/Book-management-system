# Book Management System

A simple React-based Book Management System built with functional components, hooks, JSON Server for local development, and a Netlify Function mock API for deployment.

## Features

- Display a list of books with title, author, genre, and publication year
- Add a new book
- Edit an existing book
- Delete a book
- Search books by title or author
- Filter books by genre
- Loading and basic API error states

## Folder Structure

```text
Book-management-system/
|-- db.json
|-- index.html
|-- netlify.toml
|-- package.json
|-- README.md
|-- vite.config.js
|-- netlify/
|   `-- functions/
|       `-- books.js
`-- src/
    |-- App.jsx
    |-- main.jsx
    |-- styles.css
    |-- components/
    |   |-- BookForm.jsx
    |   |-- BookItem.jsx
    |   |-- BookList.jsx
    |   |-- GenreFilter.jsx
    |   `-- SearchBar.jsx
    `-- services/
        `-- bookApi.js
```

## Local Setup

1. Clone the repository:

```bash
git clone https://github.com/teju-ops/Book-management-system.git
cd Book-management-system
```

2. Install dependencies:

```bash
npm install
```

3. Start the mock API:

```bash
npm run api
```

The mock API runs at:

```text
http://localhost:3001/books
```

4. In a second terminal, start the React app:

```bash
npm run dev
```

The app runs at:

```text
http://localhost:5173
```

## Mock API Details

This project uses JSON Server with the included `db.json` file.

Available endpoints:

```text
GET    /books
POST   /books
PUT    /books/:id
DELETE /books/:id
```

The app reads the API URL from `VITE_API_URL` when provided.

In local development, the default API URL is:

```text
http://localhost:3001/books
```

In production, the default API URL is the Netlify API route:

```text
/api/books
```

Optional `.env` example:

```env
VITE_API_URL=http://localhost:3001/books
```

On Netlify, `/api/books` is handled by the included mock API Netlify Function at `netlify/functions/books.js`.

## Live Deployed URL

Live URL: _Add deployed URL here_

## Deploy to Vercel

1. Push this project to GitHub.
2. Go to [https://vercel.com](https://vercel.com).
3. Click **Add New Project**.
4. Import this GitHub repository.
5. Keep the default Vite settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add `VITE_API_URL` if using a hosted MockAPI.io endpoint.
7. Click **Deploy**.
8. Copy the generated live URL and paste it in the README placeholder above.

## Deploy to Netlify

1. Push this project to GitHub.
2. Go to [https://www.netlify.com](https://www.netlify.com).
3. Click **Add new site** and choose **Import an existing project**.
4. Select this GitHub repository.
5. Use these build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add `VITE_API_URL` if using a hosted MockAPI.io endpoint.
7. Click **Deploy site**.
8. Copy the generated live URL and paste it in the README placeholder above.

## Using MockAPI.io Instead of JSON Server

1. Create a free account at [https://mockapi.io](https://mockapi.io).
2. Create a new project.
3. Create a resource named `books`.
4. Add these fields:
   - `title`
   - `author`
   - `genre`
   - `publicationYear`
5. Copy the generated endpoint URL.
6. Create a `.env` file in the project root:

```env
VITE_API_URL=https://your-project-id.mockapi.io/books
```

7. Restart the React development server.
