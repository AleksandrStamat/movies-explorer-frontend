import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ cards, viewsCount, saveMovie, deleteMovie }) {
  const cardElements =
    cards &&
    cards
      .filter((card, index) => index < viewsCount)
      .map((item) => {
        return (
          <MoviesCard
            key={item.id || item.movieId}
            card={item}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
          />
        );
      });
  return <div className="movies-cards">{cardElements}</div>;
}

export default MoviesCardList;
