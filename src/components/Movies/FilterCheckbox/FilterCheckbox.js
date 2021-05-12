import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ handleFilter, filter }) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__container">
        <input
          onChange={handleFilter}
          className="filter-checkbox__input"
          type="checkbox"
          checked={filter}
        />
        <span className="filter-checkbox__slider" />
      </label>
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
