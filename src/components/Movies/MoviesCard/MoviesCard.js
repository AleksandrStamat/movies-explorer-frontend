import React from "react";
import { useLocation } from "react-router";
import "./MoviesCard.css";
import { urlMovies } from "../../../utils/constants";

function MoviesCard(props) {
  const { card, saveMovie, deleteMovie } = props;
  const {
    nameRU,
    duration,
    image,
    trailerLink,
    trailer,
    movieId,
    saved = true,
    id,
  } = card;
  const poster = image?.url ? urlMovies + image?.url : image || "";
  const { pathname } = useLocation();

  const timeCount = (time) => {
    const h = Math.floor(time / 60);
    const m = Math.floor(time % 60);
    const hour = h > 0 ? h + "ч " : "";
    const minutes = m > 0 ? m + "м " : "";
    return hour + minutes;
  };

  const handleClickSave = () => {
    if (!saved) {
      saveMovie(card);
    } else {
      deleteMovie(id || movieId);
    }
  };
  const isMoves = pathname === "/movies";
  return (
    <article className="movies-card">
      <div className="movies-card__header">
        <p className="movies-card__title">{nameRU}</p>
        <button
          className={`movies-card__button 
          ${
            saved
              ? isMoves
                ? "movies-card__button_active"
                : "movies-card__button_delete"
              : ""
          }
          `}
          onClick={handleClickSave}
        ></button>
      </div>
      <p className="movies-card__time">{timeCount(duration)}</p>
      <a
        className="movies-card__trailer"
        href={trailerLink || trailer}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={poster}
          alt="Изображение фильма."
          className="movies-card__image"
        />
      </a>
    </article>
  );
}

export default MoviesCard;
