import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Logo.css";

function Logo() {
  return (
    <Link to="/">
      <img src={logo} className="logo" alt="Логотип. Переход к главной странице." />
    </Link>
  );
}

export default Logo;
