import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile({ onSignOut }) {
  const Profile = {
    inputsList: [
      { name: "name", label: "Имя", type: "text", value: "Александр" },
      {
        name: "email",
        label: "Почта",
        type: "text",
        value: "pochta@yandex.ru",
      },
    ],
  };

  const [inputsStates, setInputStates] = useState({});

  useEffect(
    () =>
      Profile.inputsList.forEach((item) => {
        setInputStates((prev) => ({
          ...prev,
          [item.name]: item.value,
        }));
      }),
    [Profile.inputsList]
  );

  const handleChangeInput = (e) => {
    setInputStates((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fieldList = Profile.inputsList.map((item) => {
    const value = inputsStates[item.name] || "";
    return (
      <div key={`profile-${item.name}`} className="profile__field">
        <label htmlFor={item.name} className="profile__label">
          {" "}
          {item.label}{" "}
        </label>
        <input
          className="profile__input"
          value={value}
          onChange={handleChangeInput}
          {...item}
        />
        <span className="profile__error">Что-то пошло не так....</span>
      </div>
    );
  });

  return (
    <form className="profile">
      <h2 className="profile__title">Привет, Александр!</h2>
      <fieldset className="profile__fieldset">{fieldList}</fieldset>
      <button className="profile__btn">Редактировать</button>
      <button
        className="profile__btn profile__btn_type_exit"
        onClick={onSignOut}
      >
        Выйти из аккаунта
      </button>
    </form>
  );
}

export default Profile;
