import React from "react";
import avatar from "../../../images/avatar.jpg";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about-me about-me__section about-me__section_small about-me__section_position-big">
      <h2 className="about-me__title about-me__section-title about-me__section-title-small">
        Студент
      </h2>
      <p className="about-me__name">Виталий</p>
      <p className="about-me__profession">Фронтенд-разработчик, 30 лет</p>
      <p className="about-me__description">
        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
        есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно
        начал кодить. С 2015 года работал в компании «СКБ Контур». После того,
        как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и
        ушёл с постоянной работы.
      </p>
      <ul className="about-me__links">
        <li>
          <a
            href="https://www.facebook.com/stamat.aleksandr/"
            className="about-me__link"
          >
            Facebook
          </a>
        </li>
        <li>
          <a
            href="https://github.com/AleksandrStamat"
            className="about-me__link"
          >
            GitHub
          </a>
        </li>
      </ul>
      <img
        src={avatar}
        alt="Фотография создателя."
        className="about-me__avatar"
      />
    </section>
  );
}

export default AboutMe;
