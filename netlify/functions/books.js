import { randomUUID } from 'node:crypto';

let books = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    publicationYear: 1960
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    publicationYear: 1949
  },
  {
    id: '3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    publicationYear: 1813
  },
  {
    id: '4',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Science Fiction',
    publicationYear: 1965
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    publicationYear: 1937
  },
  {
    id: '6',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: 'Science Fiction',
    publicationYear: 2021
  },
  {
    id: '7',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    genre: 'Dystopian',
    publicationYear: 2008
  },
  {
    id: '8',
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    genre: 'Thriller',
    publicationYear: 2012
  },
  {
    id: '9',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    genre: 'Non-Fiction',
    publicationYear: 2011
  },
  {
    id: '10',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    publicationYear: 1951
  },
  {
    id: '11',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    publicationYear: 2018
  },
  {
    id: '12',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Tragedy',
    publicationYear: 1925
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

export async function handler(event) {
  const method = event.httpMethod;
  const id = getBookId(event);

  try {
    if (method === 'GET') {
      return response(200, id ? books.find((book) => book.id === id) || null : books);
    }

    if (method === 'POST') {
      const bookData = JSON.parse(event.body || '{}');
      const newBook = {
        ...bookData,
        id: randomUUID()
      };
      books = [...books, newBook];

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
      books = books.map((book) => (book.id === id ? updatedBook : book));

      return response(200, updatedBook);
    }

    if (method === 'DELETE') {
      if (!id) {
        return response(400, { message: 'Book id is required.' });
      }

      books = books.filter((book) => book.id !== id);

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
