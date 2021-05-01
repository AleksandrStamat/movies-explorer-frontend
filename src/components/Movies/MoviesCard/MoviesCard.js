import React from "react";
import { useLocation } from "react-router";
import "./MoviesCard.css";

function MoviesCard({ data }) {
  const { nameRU, duration, image, saved } = data;
  const { pathname } = useLocation();
  return (
    <div className="movies-card">
      <div className="movies-card__header">
        <p className="movies-card__title">{nameRU}</p>
        <button
          className={`movies-card__button 
          ${saved && pathname === "/movies" && "movies-card__button_active"}
          ${
            saved &&
            (pathname === "/movies"
              ? "movies-card__button_active"
              : "movies-card__button_delete")
          }`}
        ></button>
      </div>
      <p className="movies-card__time">{`${Math.floor(
        duration / 60
      )} минут`}</p>
      <img
        src={image.url}
        alt="Изображение фильма."
        className="movies-card__image"
      />
    </div>
  );
}

export default MoviesCard;
