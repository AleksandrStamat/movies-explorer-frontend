import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio portfolio__section portfolio__section_small">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://aleksandrstamat.github.io/how-to-learn/">
            <p className="portfolio__name">Статичный сайт</p>
            <div className="portfolio__icon">↗</div>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://aleksandrstamat.github.io/russian-travel/index.html">
            <p className="portfolio__name">Адаптивный сайт</p>
            <div className="portfolio__icon">↗</div>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://mesto.stamat.nomoredomains.club/">
            <p className="portfolio__name">Одностраничное приложение</p>
            <div className="portfolio__icon">↗</div>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
