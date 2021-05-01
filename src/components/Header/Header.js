import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import ProfileIcon from "../../images/profile.svg";
import "./Header.css";

function Header(props) {
  const { isOpen, onClose, onOpenMobileMenu } = props;

  return (
    <Switch>
      <Route exact path="/">
        <header className="header header__blue">
          <Logo className="header__logo" />
          <nav className="header__auth-container_main-page">
            <NavLink to="/signup" className="header__link header__link_signup">
              Регистрация
            </NavLink>
            <NavLink to="/signin" className="header__link header__link_signin">
              Войти
            </NavLink>
          </nav>
        </header>
      </Route>
      <Route path={["/movies", "/saved-movies", "/profile"]}>
        <header className="header header__grid header__white">
          <Logo className="header__logo" />
          <Navigation
            isOpen={isOpen}
            onClose={onClose}
            onOpenMobileMenu={onOpenMobileMenu}
          />
          <NavLink
            to="/profile"
            className="header__auth-container header__auth-container_profile"
          >
            <img src={ProfileIcon} alt="Переход к профилю." />
          </NavLink>
          <button
            type="button"
            className="header__menu-container"
            onClick={isOpen ? onClose : onOpenMobileMenu}
          >
            <span
              className={`header__menu-button ${
                isOpen && "header__menu-button_close"
              }`}
            />
          </button>
        </header>
      </Route>
    </Switch>
  );
}

export default Header;
