import Section from "../Section/Section";
import React from "react";
import { useHistory } from "react-router";

function Register({ onRegistration }) {
  const Registration = {
    inputsList: [
      { name: "name", label: "Имя", type: "text", maxLength: 30 },
      { name: "email", label: "E-mail", type: "text" },
      { name: "password", label: "Пароль", type: "password" },
    ],
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    title: "Добро пожаловать!",
    name: "register",
    submitText: "Зарегистрироваться",
    footerData: {
      description: "Уже зарегистрированы?",
      linkTo: "/signin",
      linkText: "Войти",
    },
    validators: {
      name: {
        required: (value) => {
          return {
            valid: !!value,
            message: "Вы пропустили это поле.",
          };
        },
        minLength: (value) => {
          return {
            valid: value.length > 1,
            message: `Минимальное количество символов: 2. Длина текста сейчас: ${value.length} символ.`,
          };
        },
      },
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
  const handleRegistration = () => {
    history.push("/signin");
  };
  return <Section {...Registration} onSubmit={handleRegistration} />;
}

export default Register;
