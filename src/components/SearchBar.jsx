function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <label className="top-search">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <span className="sr-only">Search by title or author</span>
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by title or author"
      />
    </label>
  )
}

export default SearchBar
