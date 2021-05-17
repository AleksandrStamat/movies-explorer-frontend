import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section className="techs techs__section techs__section_position-small">
      <h2 className="techs__section-title techs__section-title-big">
        Технологии
      </h2>
      <p className="techs__heading">8 технологий</p>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__list">
        <li className="techs__item">HTML</li>
        <li className="techs__item">CSS</li>
        <li className="techs__item">JavaScript</li>
        <li className="techs__item">React</li>
        <li className="techs__item">Express.js</li>
        <li className="techs__item">mongoDB</li>
        <li className="techs__item">Git</li>
        <li className="techs__item">Figma</li>
      </ul>
    </section>
  );
}

export default Techs;
