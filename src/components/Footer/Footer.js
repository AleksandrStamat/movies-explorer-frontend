import React from "react";
import { Route, Switch } from "react-router-dom";

import "./Footer.css";

function Footer() {
  return (
    <Switch>
      <Route exact path="/">
        <footer className="footer">
          <p className="footer__title">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
          <div className="footer__copyright">
            <p className="footer__copyright-date">© 2021</p>
            <ul className="footer__links">
              <li>
                <a
                  href="https://praktikum.yandex.ru/"
                  className="footer__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Яндекс.Практикум
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/AleksandrStamat"
                  className="footer__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/stamat.aleksandr/"
                  className="footer__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </Route>
      <Route path={["/movies", "/saved-movies"]}>
        <footer className="footer">
          <p className="footer__title">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
          <div className="footer__copyright">
            <p className="footer__copyright-date">© 2021</p>
            <ul className="footer__links">
              <li>
                <a
                  href="https://praktikum.yandex.ru/"
                  className="footer__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Яндекс.Практикум
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/AleksandrStamat"
                  className="footer__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/stamat.aleksandr/"
                  className="footer__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </Route>
    </Switch>
  );
}

export default Footer;
