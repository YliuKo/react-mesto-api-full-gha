import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="title"
        type="text"
        required
        className="popup__input popup__input_data-title"
        placeholder="Название"
        name="titleForm"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__text-error title-error"> </span>
      <input
        id="url"
        type="url"
        required
        className="popup__input popup__input_data-photo"
        placeholder="Ссылка на картинку"
        name="linkForm"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <span className="popup__text-error url-error"> </span>
    </PopupWithForm>
  );
}
