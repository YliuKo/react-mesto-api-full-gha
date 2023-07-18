import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="username"
        type="text"
        required
        className="popup__input popup__input_data-name"
        placeholder="Имя"
        name="userName"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__text-error username-error"> </span>
      <input
        id="activity"
        type="text"
        required
        className="popup__input popup__input_data-description"
        placeholder="Вид деятельности"
        name="aboutUser"
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
      />
      <span className="popup__text-error activity-error"> </span>
    </PopupWithForm>
  );
}
