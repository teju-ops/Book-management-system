import { useState } from 'react'

const initialFormState = {
  title: '',
  author: '',
  genre: 'Fiction',
  publicationYear: '',
}

const genreOptions = [
  'Fiction',
  'Self-help',
  'Programming',
  'Philosophy',
  'Classic',
  'History',
  'Biography',
  'Fantasy',
]

function getInitialState(editingBook) {
  if (!editingBook) {
    return initialFormState
  }

  return {
    title: editingBook.title,
    author: editingBook.author,
    genre: editingBook.genre,
    publicationYear: editingBook.publicationYear,
  }
}

function BookForm({ editingBook, isSaving, onCancelEdit, onSaveBook }) {
  const [formData, setFormData] = useState(() => getInitialState(editingBook))

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const bookData = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      genre: formData.genre.trim(),
      publicationYear: Number(formData.publicationYear),
    }

    onSaveBook(bookData)

    if (!editingBook) {
      setFormData(initialFormState)
    }
  }

  const genreChoices = genreOptions.includes(formData.genre)
    ? genreOptions
    : [formData.genre, ...genreOptions].filter(Boolean)

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div className="entry-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M8 4h12v12H8z" />
            <path d="M4 8h12v12H4z" />
            <path d="M10 14h4" />
            <path d="M12 12v4" />
          </svg>
        </div>
        <h2>{editingBook ? 'Update Entry' : 'Catalog New Entry'}</h2>
      </div>

      <label>
        Book Title
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. The Great Gatsby"
          disabled={isSaving}
          required
        />
      </label>

      <label>
        Author Name
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="e.g. F. Scott Fitzgerald"
          disabled={isSaving}
          required
        />
      </label>

      <div className="form-grid">
        <label>
          Genre
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            disabled={isSaving}
            required
          >
            {genreChoices.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>

        <label>
          Year
          <input
            type="number"
            name="publicationYear"
            min="1000"
            max="2100"
            value={formData.publicationYear}
            onChange={handleChange}
            placeholder="YYYY"
            disabled={isSaving}
            required
          />
        </label>
      </div>

      <button type="submit" className="submit-button" disabled={isSaving}>
        <span aria-hidden="true">+</span>
        {isSaving ? 'Saving...' : editingBook ? 'Save Changes' : 'Add to Library'}
      </button>

      {editingBook && (
        <button
          type="button"
          className="cancel-button"
          onClick={onCancelEdit}
          disabled={isSaving}
        >
          Cancel Edit
        </button>
      )}

      <p className="form-tip">
        Tip: You can also drag and drop a book cover image or scan a barcode to
        auto-fill details.
      </p>
    </form>
  )
}

export default BookForm
