import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import Cards from "./Card";
import Card from "./Card";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile">
        <div className="profile__place">
          <div className="profile__overlay" onClick={onEditAvatar}>
            <img
              src={currentUser.avatar}
              className="profile__icon"
              alt="иконка пользователя"
            />
          </div>
          <div className="profile__info">
            <div className="profile__first-line">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements content__elements">
        {cards.map((obj) => (
          <Card
            key={obj._id}
            card={obj}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
      <Cards />
    </main>
  );
}
