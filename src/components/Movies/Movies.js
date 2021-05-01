import React from "react";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import "./Movies.css";

function Movies({ cards }) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList cards={cards} />
      {cards.length > 12 && <button className="movies__more">Ещё</button>}
    </section>
  );
}

export default Movies;
