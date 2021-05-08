import React from "react";
import { useFormWithValidation } from '../../utils/formValidation';

function Login({ handleSignIn, handleSignUp, isLogin }) {
  const validate = useFormWithValidation();
  const title = (isLogin) ? "Рады видеть!" : "Добро пожаловать!";
  const paragraph = (isLogin) ? "Ещё не зарегистрированы?" : "Уже зарегистрированы?";
  const linkText = (isLogin) ? "Регистрация" : "Войти";
  const link = (isLogin) ? "/signup" : "/signin";
  const button = (isLogin) ? "Войти" : "Зарегистрироваться";
  function handleSubmit(e) {
    e.preventDefault();
    if (isLogin) {
      handleSignIn(validate.values); 
    } else {
      handleSignUp(validate.values); 
    }
  }

  return (
    <form onSubmit={handleSubmit} className="section" name="login">
      <a href="/">
        <img src="/static/media/logo.8f97642a.svg" alt="Логотип. Переход к главной странице."/>
      </a>
      <h2 className="section__title">{title}</h2>
      <fieldset className="section__fieldList">
      {(isLogin) ? null :
        <div className="section__field">
          <label htmlFor="name" className="section__label">Имя</label>
          <input onChange={validate.handleChange} className="section__input " name="name" label="Имя" type="text" maxLength="30" value={validate.values.name || ""} required/>
          <span className="section__error">{validate.errors.name || ""}</span>
        </div>
      }
        <div className="section__field">
          <label htmlFor="email" className="section__label">E-mail</label>
          <input onChange={validate.handleChange} className={`section__input ${(validate.errors.email) ? "section__input_error" : ""}`} name="email" label="E-mail" type="email" value={validate.values.email || ""} required/>
          <span className="section__error  ">{validate.errors.email || ""}</span>
        </div>
        <div className="section__field">
          <label htmlFor="password" className="section__label">Пароль</label>
          <input onChange={validate.handleChange} className={`section__input ${(validate.errors.password) ? "section__input_error" : ""}`} name="password" label="Пароль" type="password" value={validate.values.password || ""} required/>
          <span className="section__error">{validate.errors.password || ""}</span>
        </div>
      </fieldset>
      <button className={`section__submit ${(validate.isValid) ? "" : "section__submit_disabled"}`} type="submit" disabled={!validate.isValid}>{button}</button>
      <div className="section__footer">
        <p className="section__description">{paragraph}</p>
        <a className="section__link" href={link}>{linkText}</a>
      </div>
    </form>
  );
}

export default Login;
