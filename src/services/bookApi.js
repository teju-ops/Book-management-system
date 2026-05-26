const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:3001/books' : '/api/books');

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    throw new Error('Something went wrong while connecting to the book API.');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getBooks() {
  return request(API_URL);
}

export function createBook(book) {
  return request(API_URL, {
    method: 'POST',
    body: JSON.stringify(book)
  });
}

export function updateBook(id, book) {
  return request(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(book)
  });
}

export function deleteBook(id) {
  return request(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
}
