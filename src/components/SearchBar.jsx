function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <label className="control-field" htmlFor="search">
      Search
      <input
        id="search"
        type="search"
        placeholder="Search by title or author"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </label>
  );
}

export default SearchBar;
