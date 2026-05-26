function BookItem({ book, onDeleteBook, onEditBook }) {
  return (
    <article className="book-item">
      <div className="book-cover" data-genre={book.genre}>
        <span>{book.title}</span>
      </div>

      <div className="book-details">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <div className="book-info-line">
          <span className="genre-pill">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v5" />
              <path d="M8 9h8" />
              <path d="M7 16h10" />
              <path d="M5 20h14" />
              <path d="m8 16 4-7 4 7" />
            </svg>
            {book.genre}
          </span>
          <span className="year-pill">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 3v4" />
              <path d="M17 3v4" />
              <path d="M4 9h16" />
              <path d="M5 5h14v16H5z" />
            </svg>
            {book.publicationYear}
          </span>
        </div>
      </div>

      <div className="book-actions">
        <button type="button" onClick={() => onEditBook(book)} aria-label={`Edit ${book.title}`}>
          <svg viewBox="0 0 24 24">
            <path d="M4 20h4l10.5-10.5-4-4L4 16v4Z" />
            <path d="m13.5 6.5 4 4" />
          </svg>
        </button>
        <button type="button" onClick={() => onDeleteBook(book.id)} aria-label={`Delete ${book.title}`}>
          <svg viewBox="0 0 24 24">
            <path d="M4 7h16" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M6 7l1 14h10l1-14" />
            <path d="M9 7V4h6v3" />
          </svg>
        </button>
      </div>
    </article>
  )
}

export default BookItem
