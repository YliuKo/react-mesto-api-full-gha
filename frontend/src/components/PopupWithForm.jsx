import React from "react";

export default function PopupWithForm({
  title,
  name,
  buttonText,
  children,
  isOpen,
  onSubmit,
  onClose,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_open" : ""}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            className="popup__save-button "
            aria-label="сохранить"
            type="submit"
          >
            {buttonText || "Сохранить"}
          </button>
        </form>
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button"
          aria-label="Закрытие popup"
        ></button>
      </div>
    </div>
  );
}
