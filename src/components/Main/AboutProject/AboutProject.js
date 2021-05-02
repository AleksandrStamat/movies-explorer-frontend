import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section
      id="about-project"
      className="about-project__section about-project__section_position-big"
    >
      <h2 className="about-project__section-title about-project__section-title-middle">
        О проекте
      </h2>
      <ul className="about-project">
        <li className="about-project__cell">
          <p className="about-project__heading">
            Дипломный проект включал 5 этапов
          </p>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__cell">
          <p className="about-project__heading">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about-project-line">
        <p className="about-project-line__number">1 неделя</p>
        <p className="about-project-line__number">4 недели</p>
        <p className="about-project-line__description">Back-end</p>
        <p className="about-project-line__description">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
