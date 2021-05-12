import React, { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm({ onSearch, handleFilter, filter }) {
  const [keyword, setKeyword] = useState("");
  function handleSearch(e) {
    setKeyword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSearch(keyword);
  }
  return (
    <form onSubmit={handleSubmit} className="search">
      <div className="search__container">
        <input
          onChange={handleSearch}
          type="text"
          id="search"
          name="search"
          className="search__text"
          placeholder="Фильм"
          value={keyword || ""}
        />
        <button type="submit" className="search__button">
          Найти
        </button>
      </div>
      <div className="search__filter">
        <FilterCheckbox handleFilter={handleFilter} filter={filter} />
      </div>
    </form>
  );
}

export default SearchForm;
