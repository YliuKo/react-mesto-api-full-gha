import React from "react";

export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_photo ${card ? "popup_open" : ""}`}>
      <div className="popup__container popup__container_type_photo">
        <img
          className="popup__image-full-screen"
          src={card?.link}
          alt={card?.name}
        />
        <h2 className="popup__title-full-screen">{card?.name}</h2>
        <button
          onClick={onClose}
          type="button"
          aria-label="закрыть"
          className="popup__close-button"
        ></button>
      </div>
    </div>
  );
}
