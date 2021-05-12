import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import ProfileIcon from "../../images/profile.svg";
import "./Header.css";

function Header(props) {
  const { isOpen, onClose, onOpenMobileMenu, loggedIn } = props;
  const location = useLocation();
  const isAuthOrRegistr =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/error";
  const isMain = location.pathname === "/";
  return (
    <>
      {isAuthOrRegistr ? null : (
        <header
          className={`header ${
            isMain ? " header__blue" : "header__grid header__white"
          }`}
        >
          <Logo className="header__logo" />
          {!loggedIn ? (
            <nav className="header__auth-container_main-page">
              <NavLink
                to="/signup"
                className="header__link header__link_signup"
              >
                Регистрация
              </NavLink>
              <NavLink
                to="/signin"
                className="header__link header__link_signin"
              >
                Войти
              </NavLink>
            </nav>
          ) : (
            <>
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
            </>
          )}
        </header>
      )}
    </>
  );
}

export default Header;
