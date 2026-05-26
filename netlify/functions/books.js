import { getStore } from '@netlify/blobs';
import { randomUUID } from 'node:crypto';

const STORE_KEY = 'all-books';

const defaultBooks = [
  {
    id: '1',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    publicationYear: 1988
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-help',
    publicationYear: 2018
  },
  {
    id: '3',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Programming',
    publicationYear: 2008
  }
];

const jsonHeaders = {
  'Content-Type': 'application/json'
};

function response(statusCode, body) {
  return {
    statusCode,
    headers: jsonHeaders,
    body: JSON.stringify(body)
  };
}

function getBookId(event) {
  const parts = event.path.split('/').filter(Boolean);
  const booksIndex = parts.lastIndexOf('books');

  return booksIndex >= 0 ? parts[booksIndex + 1] : null;
}

async function readBooks(store) {
  const savedBooks = await store.get(STORE_KEY, { type: 'json' });
  return savedBooks || defaultBooks;
}

async function saveBooks(store, books) {
  await store.setJSON(STORE_KEY, books);
}

export async function handler(event) {
  const store = getStore('book-management-system');
  const method = event.httpMethod;
  const id = getBookId(event);

  try {
    const books = await readBooks(store);

    if (method === 'GET') {
      return response(200, id ? books.find((book) => book.id === id) || null : books);
    }

    if (method === 'POST') {
      const bookData = JSON.parse(event.body || '{}');
      const newBook = {
        ...bookData,
        id: randomUUID()
      };
      const updatedBooks = [...books, newBook];

      await saveBooks(store, updatedBooks);
      return response(201, newBook);
    }

    if (method === 'PUT') {
      if (!id) {
        return response(400, { message: 'Book id is required.' });
      }

      const bookData = JSON.parse(event.body || '{}');
      const bookExists = books.some((book) => book.id === id);

      if (!bookExists) {
        return response(404, { message: 'Book not found.' });
      }

      const updatedBook = {
        ...bookData,
        id
      };
      const updatedBooks = books.map((book) => (book.id === id ? updatedBook : book));

      await saveBooks(store, updatedBooks);
      return response(200, updatedBook);
    }

    if (method === 'DELETE') {
      if (!id) {
        return response(400, { message: 'Book id is required.' });
      }

      const updatedBooks = books.filter((book) => book.id !== id);
      await saveBooks(store, updatedBooks);

      return {
        statusCode: 204,
        headers: jsonHeaders,
        body: ''
      };
    }

    return response(405, { message: 'Method not allowed.' });
  } catch (error) {
    return response(500, {
      message: 'Something went wrong while connecting to the book API.'
    });
  }
}
