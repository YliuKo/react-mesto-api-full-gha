import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const link = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: link.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Обновить аватар"
      name="main-foto"
      buttonText="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={link}
        className="popup__input"
        id="photo"
        name="avatar"
        type="url"
        placeholder="Фото профиля"
        autoComplete="off"
        onChange={(e) => (link.current.value = e.target.value)}
        required
      />
      <span className="popup__text-error photo-error"></span>
    </PopupWithForm>
  );
}
