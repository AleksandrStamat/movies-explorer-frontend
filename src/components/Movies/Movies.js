import React from "react";
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
  onSearch,
}) {
  return (
    <section className="movies">
      <SearchForm
        onSearch={onSearch}
        handleFilter={handleFilter}
        filter={filter}
      />
      <MoviesCardList
        cards={cards}
        viewsCount={viewsCount}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
      />
      {cards.length > viewsCount && (
        <button onClick={handleMore} className="movies__more">
          Ещё
        </button>
      )}
      {!cards.length ? (
        <p className="movies__not-found">Фильмы не найдены</p>
      ) : null}
    </section>
  );
}

export default Movies;
