import Section from "../Section/Section";
import React from "react";
import { useHistory } from "react-router";

function Login({ onSignIn }) {
  const Login = {
    inputsList: [
      { name: "email", label: "E-mail", type: "text" },
      { name: "password", label: "Пароль", type: "password" },
    ],
    defaultValues: {
      password: "qwerty12",
      email: "pochta@yandex.ru",
    },
    onlyDifferent: false,
    title: "Рады видеть!",
    name: "login",
    submitText: "Войти",
    footerData: {
      description: "Ещё не зарегистрированы?",
      linkTo: "/signup",
      linkText: "Регистрация",
    },
    validators: {
      email: {
        required: (value) => {
          return {
            valid: !!value,
            message: "Вы пропустили это поле.",
          };
        },
        minLength: (value) => {
          return {
            valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: `Некорректный e-mail`,
          };
        },
      },
      password: {
        required: (value) => {
          return {
            valid: !!value,
            message: "Вы пропустили это поле.",
          };
        },
        minLength: (value) => {
          return {
            valid: value.length > 7,
            message: `Минимальное количество символов: 8. Длина текста сейчас: ${value.length} символ.`,
          };
        },
      },
    },
  };

  const history = useHistory();
  const handleSignIn = () => {
    onSignIn();
    history.push("/");
  };
  return <Section {...Login} onSubmit={handleSignIn} />;
}

export default Login;
