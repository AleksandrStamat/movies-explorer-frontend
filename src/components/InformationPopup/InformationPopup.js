import React from "react";
import "./InformationPopup.css";

function InformationPopup({ message, onSubmit }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
  };

  return (
    <div className={`information-popup ${message && "information-popup_opened"}`}>
      <form className="information-popup__container" onSubmit={handleSubmit}>
        <h2 className="information-popup__title">{message}</h2>
        <button type="submit" className="information-popup__submit">Оk</button>
      </form>
    </div>
  );
}

export default InformationPopup;
