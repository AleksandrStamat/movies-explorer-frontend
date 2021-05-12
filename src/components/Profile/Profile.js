import React, { useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/formValidation";
import "./Profile.css";

function Profile({ onSignOut, handleUpdate }) {
  const user = React.useContext(CurrentUserContext);
  const validate = useFormWithValidation();

  useEffect(() => {
    validate.setValues(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdate(validate.values);
  }
  return (
    <form onSubmit={handleSubmit} className="profile">
      <h2 className="profile__title">Привет, {user.name}!</h2>
      <fieldset className="profile__fieldset">
        <div className="profile__field">
          <label htmlFor="name" className="profile__label">
            Имя
          </label>
          <input
            onChange={validate.handleChange}
            className="profile__input"
            name="name"
            label="Имя"
            type="text"
            value={validate.values.name || ""}
            minLength="1"
            maxLength="20"
            required
          />
          <span className="profile__error">{validate.errors.name || ""}</span>
        </div>
        <div className="profile__field">
          <label htmlFor="email" className="profile__label">
            Почта
          </label>
          <input
            onChange={validate.handleChange}
            className="profile__input"
            name="email"
            label="Почта"
            type="email"
            value={validate.values.email || ""}
            required
          />
          <span className="profile__error">{validate.errors.email || ""}</span>
        </div>
      </fieldset>
      <button type="submit" className="profile__btn">
        Редактировать
      </button>
      <button className="profile__btn profile__btn_exit" onClick={onSignOut}>
        Выйти из аккаунта
      </button>
    </form>
  );
}

export default Profile;
