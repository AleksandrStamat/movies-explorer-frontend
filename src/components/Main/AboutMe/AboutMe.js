import React from "react";
import avatar from "../../../images/avatar.png";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about-me about-me__section about-me__section_small about-me__section_position-big">
      <h2 className="about-me__title about-me__section-title about-me__section-title-small">
        Студент
      </h2>
      <p className="about-me__name">Александр</p>
      <p className="about-me__profession">
        Начинающий фронтенд-разработчик, 24 года
      </p>
      <p className="about-me__description">
        Живу в Москве. Всегда пытался найти себя, пробовал себя во многих
        сферах, но понимал, что это не моё. После того, как прошёл курс по
        веб-разработке, начал заниматься фриланс-заказами и понял, что мне
        нравится именно это. Всегда довожу дело до конца, нахожу подход к
        каждому человеку. Люблю хорошее и стоящее кино, отдельно хочу отметить
        научные фильмы про космос. В свободное время также катаюсь на лонгборде,
        слушая любимые треки. Люблю Антоху МС и Хлеб.
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
