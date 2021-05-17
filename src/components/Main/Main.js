import React from "react";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import "./Main.css";

function Main() {
  return (
    <main className="main">
      <div className="main__container main__container_blue">
        <Promo />
      </div>
      <div className="main__container main__container_white">
        <AboutProject />
      </div>
      <div className="main__container main__container_blue">
        <Techs />
      </div>
      <div className="main__container main__container_white">
        <AboutMe />
        <Portfolio />
      </div>
    </main>
  );
}
export default Main;
