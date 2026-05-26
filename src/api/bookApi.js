const API_URL = import.meta.env.VITE_BOOK_API_URL ?? '/.netlify/functions/books'

function normalizeBook(book) {
  return {
    id: String(book.id ?? book._id),
    title: book.title,
    author: book.author,
    genre: book.genre,
    publicationYear: Number(book.publicationYear),
  }
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error('The book API request failed. Please try again.')
  }

  if (response.status === 204) {
    return null
  }

  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export function getBooks() {
  return request(API_URL).then((books) => books.map(normalizeBook))
}

export function createBook(book) {
  return request(API_URL, {
    method: 'POST',
    body: JSON.stringify(book),
  }).then(normalizeBook)
}

export function updateBook(id, book) {
  return request(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(book),
  }).then(() => ({ id, ...book }))
}

export function deleteBook(id) {
  return request(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
}
