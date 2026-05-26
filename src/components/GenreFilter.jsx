function GenreFilter({ genres, selectedGenre, onGenreChange }) {
  return (
    <label className="control-field" htmlFor="genreFilter">
      Genre
      <select
        id="genreFilter"
        value={selectedGenre}
        onChange={(event) => onGenreChange(event.target.value)}
      >
        <option value="">All genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </label>
  );
}

export default GenreFilter;
