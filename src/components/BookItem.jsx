function BookItem({ book, onEdit, onDelete }) {
  return (
    <li className="book-item">
      <div>
        <h3>{book.title}</h3>
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Genre:</strong> {book.genre}
        </p>
        <p>
          <strong>Publication Year:</strong> {book.publicationYear}
        </p>
      </div>

      <div className="book-actions">
        <button type="button" onClick={() => onEdit(book)}>
          Edit
        </button>
        <button type="button" className="danger-button" onClick={() => onDelete(book.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default BookItem;
