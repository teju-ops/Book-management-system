import BookItem from './BookItem.jsx';

function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="status">No books found.</p>;
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookItem key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default BookList;
