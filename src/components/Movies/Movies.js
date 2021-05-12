import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import "./Movies.css";

function Movies({
  cards,
  viewsCount,
  handleMore,
  saveMovie,
  deleteMovie,
  handleFilter,
  filter,
}) {
  const [filterCard, setFilterCard] = useState([]);
  function onSearch(keyword) {
    setFilterCard(
      cards.filter(({ nameRU, nameEN }) => {
        if (!keyword) {
          return true;
        }
        if (typeof nameRU !== "string" || typeof nameEN !== "string") {
          return false;
        }
        const ru = nameRU.toLowerCase();
        const en = nameEN.toLowerCase();
        const word = keyword.toLowerCase();
        return ru.indexOf(word) !== -1 || en.indexOf(word) !== -1;
      })
    );
  }
  useEffect(() => {
    setFilterCard(cards);
  }, [cards]);

  return (
    <section className="movies">
      <SearchForm
        onSearch={onSearch}
        handleFilter={handleFilter}
        filter={filter}
      />
      <MoviesCardList
        cards={filterCard}
        viewsCount={viewsCount}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
      />
      {filterCard.length > viewsCount && (
        <button onClick={handleMore} className="movies__more">
          Ещё
        </button>
      )}
      {!filterCard.length ? <p className="movies__not-found">Фильмы не найдены</p> : null}
    </section>
  );
}

export default Movies;
