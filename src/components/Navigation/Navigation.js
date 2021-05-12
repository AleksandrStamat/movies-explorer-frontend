import React from "react";
import { Route, Switch, NavLink, useLocation } from "react-router-dom";
import ProfileIcon from "../../images/profile.svg";
import "./Navigation.css";

function Navigation(props) {
  const { isOpen, onClose } = props;
  const location = useLocation();

  function handleClickLayoutMenuClose(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }
  const isMain = location.pathname === "/";
  return (
    <>
      <div className="navigation">
        <div
          className={`navigation__overlay ${
            isOpen && "navigation__overlay_is-open"
          }`}
          onClick={handleClickLayoutMenuClose}
        />
        <div
          className={`navigation__menu-container-mobile ${
            isOpen && "navigation__menu-container-mobile_is-open"
          }`}
        >
          <nav className="navigation__menu-mobile">
            <NavLink
              exact
              to="/"
              className="navigation__menu-mobile-link"
              activeClassName="navigation__menu-mobile-link_active"
              onClick={onClose}
            >
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              className="navigation__menu-mobile-link"
              activeClassName="navigation__menu-mobile-link_active"
              onClick={onClose}
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className="navigation__menu-mobile-link"
              activeClassName="navigation__menu-mobile-link_active"
              onClick={onClose}
            >
              Сохранённые фильмы
            </NavLink>
          </nav>

          <NavLink
            to="/profile"
            className="navigation__profile-container-link"
            onClick={onClose}
          >
            <img src={ProfileIcon} alt="Переход к профилю." />
          </NavLink>
        </div>
      </div>

      <Switch>
        <Route path={["/","/movies", "/saved-movies", "/profile"]}>
          <nav className="navigation__movies-container">
            <NavLink
              to="/movies"
              className= {isMain ? "navigation__movies-link_main" : "navigation__movies-link"}
              activeClassName="navigation__movies-link_active"
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className= {isMain ? "navigation__movies-link_main" : "navigation__movies-link"}
              activeClassName="navigation__movies-link_active"
            >
              Сохранённые фильмы
            </NavLink>
          </nav>
        </Route>
      </Switch>
    </>
  );
}

export default Navigation;
