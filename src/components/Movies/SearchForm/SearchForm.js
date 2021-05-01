import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm() {
  return (
    <form className="search">
      <div className="search__container">
        <input className="search__text" required placeholder="Фильм" />
        <button type="submit" className="search__button">
          Найти
        </button>
      </div>
      <div className="search__container">
        <FilterCheckbox />
      </div>
    </form>
  );
}

export default SearchForm;
