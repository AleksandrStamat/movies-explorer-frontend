import React from "react";
import { useFormWithValidation } from "../../utils/formValidation";
import "./Auth.css";
import Logo from "../Logo/Logo";

function Login({ handleSignIn, handleSignUp, isLogin }) {
  const validate = useFormWithValidation();
  const title = isLogin ? "Рады видеть!" : "Добро пожаловать!";
  const paragraph = isLogin
    ? "Ещё не зарегистрированы?"
    : "Уже зарегистрированы?";
  const linkText = isLogin ? "Регистрация" : "Войти";
  const link = isLogin ? "/signup" : "/signin";
  const button = isLogin ? "Войти" : "Зарегистрироваться";
  function handleSubmit(e) {
    e.preventDefault();
    if (isLogin) {
      handleSignIn(validate.values);
    } else {
      handleSignUp(validate.values);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth" name="login">
      <Logo />
      <h2 className="auth__title">{title}</h2>
      <fieldset className="auth__field-list">
        {isLogin ? null : (
          <div className="auth__field">
            <label htmlFor="name" className="auth__label">
              Имя
            </label>
            <input
              onChange={validate.handleChange}
              className={`auth__input ${
                validate.errors.name ? "auth__input_error" : ""
              }`}
              name="name"
              label="Имя"
              type="text"
              minLenght="2"
              maxLength="30"
              value={validate.values.name || ""}
              required
            />
            <span className="auth__error">{validate.errors.name || ""}</span>
          </div>
        )}
        <div className="auth__field">
          <label htmlFor="email" className="auth__label">
            E-mail
          </label>
          <input
            onChange={validate.handleChange}
            className={`auth__input ${
              validate.errors.email ? "auth__input_error" : ""
            }`}
            name="email"
            label="E-mail"
            type="email"
            value={validate.values.email || ""}
            required
          />
          <span className="auth__error  ">{validate.errors.email || ""}</span>
        </div>
        <div className="auth__field">
          <label htmlFor="password" className="auth__label">
            Пароль
          </label>
          <input
            onChange={validate.handleChange}
            className={`auth__input ${
              validate.errors.password ? "auth__input_error" : ""
            }`}
            name="password"
            label="Пароль"
            type="password"
            minLenght="6"
            maxLength="30"
            value={validate.values.password || ""}
            required
          />
          <span className="auth__error">{validate.errors.password || ""}</span>
        </div>
      </fieldset>
      <button
        className={`auth__submit ${
          validate.isValid ? "" : "auth__submit_disabled"
        }`}
        type="submit"
        disabled={!validate.isValid}
      >
        {button}
      </button>
      <div className="auth__footer">
        <p className="auth__description">{paragraph}</p>
        <a className="auth__link" href={link}>
          {linkText}
        </a>
      </div>
    </form>
  );
}

export default Login;
