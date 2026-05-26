import { useEffect, useState } from 'react';

const initialFormState = {
  title: '',
  author: '',
  genre: '',
  publicationYear: ''
};

function BookForm({ bookToEdit, onSave, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        title: bookToEdit.title,
        author: bookToEdit.author,
        genre: bookToEdit.genre,
        publicationYear: bookToEdit.publicationYear
      });
    } else {
      setFormData(initialFormState);
    }
  }, [bookToEdit]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSave({
      ...formData,
      publicationYear: Number(formData.publicationYear)
    });

    if (!bookToEdit) {
      setFormData(initialFormState);
    }
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{bookToEdit ? 'Update Book' : 'Add Book'}</h2>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="author">Author</label>
      <input
        id="author"
        name="author"
        type="text"
        value={formData.author}
        onChange={handleChange}
        required
      />

      <label htmlFor="genre">Genre</label>
      <input
        id="genre"
        name="genre"
        type="text"
        value={formData.genre}
        onChange={handleChange}
        required
      />

      <label htmlFor="publicationYear">Publication Year</label>
      <input
        id="publicationYear"
        name="publicationYear"
        type="number"
        min="1000"
        max="2099"
        value={formData.publicationYear}
        onChange={handleChange}
        required
      />

      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : bookToEdit ? 'Update Book' : 'Add Book'}
        </button>

        {bookToEdit && (
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default BookForm;
