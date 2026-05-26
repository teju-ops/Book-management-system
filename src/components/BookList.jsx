import BookItem from './BookItem'

function BookList({ books, onDeleteBook, onEditBook }) {
  if (books.length === 0) {
    return <p className="message">No books found.</p>
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onDeleteBook={onDeleteBook}
          onEditBook={onEditBook}
        />
      ))}
    </div>
  )
}

export default BookList
