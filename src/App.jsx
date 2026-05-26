import { useEffect, useMemo, useState } from 'react';
import BookForm from './components/BookForm.jsx';
import BookList from './components/BookList.jsx';
import GenreFilter from './components/GenreFilter.jsx';
import SearchBar from './components/SearchBar.jsx';
import { createBook, deleteBook, getBooks, updateBook } from './services/bookApi.js';

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      setError('');

      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  const genres = useMemo(() => {
    return [...new Set(books.map((book) => book.genre).filter(Boolean))].sort();
  }, [books]);

  const filteredBooks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(normalizedSearch) ||
        book.author.toLowerCase().includes(normalizedSearch);
      const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;

      return matchesSearch && matchesGenre;
    });
  }, [books, searchTerm, selectedGenre]);

  async function handleSaveBook(bookData) {
    setSubmitting(true);
    setError('');

    try {
      if (editingBook) {
        const updatedBook = await updateBook(editingBook.id, bookData);
        setBooks((currentBooks) =>
          currentBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
        );
        setEditingBook(null);
      } else {
        const newBook = await createBook(bookData);
        setBooks((currentBooks) => [...currentBooks, newBook]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteBook(id) {
    setError('');

    try {
      await deleteBook(id);
      setBooks((currentBooks) => currentBooks.filter((book) => book.id !== id));

      if (editingBook?.id === id) {
        setEditingBook(null);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  function handleCancelEdit() {
    setEditingBook(null);
  }

  return (
    <main className="app">
      <section className="header">
        <div>
          <h1>Book Management System</h1>
          <p>Manage your book collection with basic CRUD operations.</p>
        </div>
      </section>

      {error && <div className="alert">{error}</div>}

      <section className="layout">
        <BookForm
          bookToEdit={editingBook}
          onSave={handleSaveBook}
          onCancel={handleCancelEdit}
          isSubmitting={submitting}
        />

        <div className="book-section">
          <div className="controls">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <GenreFilter
              genres={genres}
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
            />
          </div>

          {loading ? (
            <p className="status">Loading books...</p>
          ) : (
            <BookList
              books={filteredBooks}
              onEdit={setEditingBook}
              onDelete={handleDeleteBook}
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
