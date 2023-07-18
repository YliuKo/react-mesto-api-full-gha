import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card?.owner._id === currentUser._id;
  const isLiked = card?.likes.some((i) => i._id === currentUser._id);
  const cardLikeBtnClassName = `element__heart${isLiked ? "_active" : ""}`;

  return (
    <article className="element">
      <img
        className="element__image"
        src={card?.link}
        alt={card?.name}
        onClick={() => onCardClick(card)}
      />
      <div className="element__signature">
        <h2 className="element__title">{card?.name}</h2>
        {isOwn && (
          <button
            type="button"
            className="element__heart-delete"
            onClick={() => onCardDelete(card)}
          ></button>
        )}
        <div className="element__favorite-group">
          <button
            type="button"
            aria-label="Убрать сердечко"
            className={cardLikeBtnClassName}
            onClick={() => onCardLike(card)}
          ></button>
          <span className="element__favorite-num">{card?.likes.length}</span>
        </div>
      </div>
    </article>
  );
}
