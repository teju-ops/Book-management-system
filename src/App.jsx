import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import { createBook, deleteBook, getBooks, updateBook } from './api/bookApi'
import BookForm from './components/BookForm'
import BookList from './components/BookList'
import SearchBar from './components/SearchBar'

function App() {
  const [books, setBooks] = useState([])
  const [editingBook, setEditingBook] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const loadBooks = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getBooks()
      setBooks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  async function handleSaveBook(bookData) {
    try {
      setSaving(true)
      setError('')

      if (editingBook) {
        const savedBook = await updateBook(editingBook.id, bookData)
        setBooks((currentBooks) =>
          currentBooks.map((book) =>
            book.id === editingBook.id ? savedBook : book,
          ),
        )
        setEditingBook(null)
        return
      }

      const savedBook = await createBook(bookData)
      setBooks((currentBooks) => [...currentBooks, savedBook])
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteBook(id) {
    const shouldDelete = window.confirm('Are you sure you want to delete this book?')

    if (!shouldDelete) {
      return
    }

    try {
      setError('')
      await deleteBook(id)
      setBooks((currentBooks) => currentBooks.filter((book) => book.id !== id))

      if (editingBook?.id === id) {
        setEditingBook(null)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const genres = useMemo(() => {
    const uniqueGenres = books.map((book) => book.genre).filter(Boolean)
    return [...new Set(uniqueGenres)].sort()
  }, [books])

  const filteredBooks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      const matchesGenre = selectedGenre ? book.genre === selectedGenre : true

      return matchesSearch && matchesGenre
    })
  }, [books, searchTerm, selectedGenre])

  return (
    <div className="booknest">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M4 5.5c2.4-1.2 4.8-1.1 7 .2v12.8c-2.2-1.4-4.6-1.6-7-.4V5.5Z" />
              <path d="M20 5.5c-2.4-1.2-4.8-1.1-7 .2v12.8c2.2-1.4 4.6-1.6 7-.4V5.5Z" />
            </svg>
          </div>
          <div>
            <h1>BookNest</h1>
            <p>Personal Curator</p>
          </div>
        </div>

        <nav className="side-nav" aria-label="Main navigation">
          <a className="side-link active" href="#dashboard">
            <span className="nav-icon grid-icon" aria-hidden="true"></span>
            Dashboard
          </a>
          <a className="side-link" href="#books">
            <span className="nav-icon book-icon" aria-hidden="true"></span>
            All Books
          </a>
          <a className="side-link" href="#add">
            <span className="nav-icon add-icon" aria-hidden="true"></span>
            Add New
          </a>
          <a className="side-link" href="#archived">
            <span className="nav-icon archive-icon" aria-hidden="true"></span>
            Archived
          </a>
        </nav>

        <div className="sidebar-footer">
          <a className="side-link" href="#help">
            <span className="nav-icon help-icon" aria-hidden="true"></span>
            Help
          </a>
          <a className="side-link" href="#logout">
            <span className="nav-icon logout-icon" aria-hidden="true"></span>
            Logout
          </a>
        </div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <nav className="top-tabs" aria-label="Library views">
            <a className="top-tab active" href="#library">Library</a>
            <a className="top-tab" href="#collections">Collections</a>
            <a className="top-tab" href="#stats">Stats</a>
          </nav>

          <div className="topbar-actions">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <button className="icon-button" type="button" aria-label="Notifications">
              <svg viewBox="0 0 24 24">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
                <path d="M13.7 21a2 2 0 0 1-3.4 0" />
              </svg>
            </button>
            <button className="icon-button" type="button" aria-label="Settings">
              <svg viewBox="0 0 24 24">
                <path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" />
                <path d="m19.4 15 1.1 2-2.2 2.2-2-1.1a7 7 0 0 1-2.1.9l-.7 2.2h-3l-.7-2.2a7 7 0 0 1-2.1-.9l-2 1.1-2.2-2.2 1.1-2a7 7 0 0 1-.9-2.1l-2.2-.7v-3l2.2-.7c.2-.8.5-1.5.9-2.1l-1.1-2 2.2-2.2 2 1.1c.6-.4 1.3-.7 2.1-.9l.7-2.2h3l.7 2.2c.8.2 1.5.5 2.1.9l2-1.1 2.2 2.2-1.1 2c.4.6.7 1.3.9 2.1l2.2.7v3l-2.2.7c-.2.8-.5 1.5-.9 2.1Z" />
              </svg>
            </button>
            <div className="profile" title="Tejaswini">
              <span>Tejaswini</span>
              <div className="avatar">T</div>
            </div>
          </div>
        </header>

        <section className="content-shell" id="dashboard">
          <section className="library-area" id="library">
            <div className="overview-row">
              <div>
                <h2>Library Overview</h2>
                <p>Manage your reading list and personal collection.</p>
              </div>
              <label className="filter-control">
                <span>Filter by:</span>
                <select
                  value={selectedGenre}
                  onChange={(event) => setSelectedGenre(event.target.value)}
                >
                  <option value="">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {error && <p className="message error">{error}</p>}
            {loading ? (
              <p className="message">Loading books...</p>
            ) : (
              <BookList
                books={filteredBooks}
                onDeleteBook={handleDeleteBook}
                onEditBook={setEditingBook}
              />
            )}
          </section>

          <aside className="entry-panel" id="add">
            <BookForm
              key={editingBook?.id ?? 'new-book'}
              editingBook={editingBook}
              isSaving={saving}
              onCancelEdit={() => setEditingBook(null)}
              onSaveBook={handleSaveBook}
            />
          </aside>
        </section>
      </main>
    </div>
  )
}

export default App
