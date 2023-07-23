import { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import PopupWithForm from "./PopupWithForm";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { Api, api } from "../utils/Api";
import { auth } from "../utils/Auth.js";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [infoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const api = new Api({
    baseUrl: "https://api.yliuko.nomoredomains.xyz",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setIsLogged(true);
            setEmail(res.data.email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getAllCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isLogged, email]);

  function handleCardClick(data) {
    setSelectedCard(data);
    console.log(data);
  }
  function handleEditAvatarClick() {
    console.log("ffff");
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prev) => prev.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(user) {
    api
      .setUserInfo(user)
      .then(() => {
        setCurrentUser({ ...currentUser, name: user.name, about: user.about });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .setAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleLogin(obj) {
    if (!obj.email || !obj.password) {
      return;
    }
    auth
      .login(obj)
      .then((data) => {
        if (data.token) {
          setIsLogged(true);
          localStorage.setItem("token", data.token);
          setEmail(obj.email);
          navigate("/");
        }
      })
      .catch((err) => {
        setErr(true);
        setIsInfoTooltipOpen((prev) => !prev);
      });
  }

  function handleRegister(obj) {
    if (!obj.email || !obj.password) {
      return;
    }
    auth
      .register(obj)
      .then((data) => {
        setErr(false);
        setIsInfoTooltipOpen((prev) => !prev);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setErr(true);
        setIsInfoTooltipOpen((prev) => !prev);
      });
  }

  function handleQuit() {
    setEmail("");
    localStorage.removeItem("token");
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser }}>
        <Header email={email} onQuit={handleQuit} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLogged={isLogged}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          title="Вы уверены?"
          name="delete"
          buttonText="Да"
          onClose={closeAllPopups}
        ></PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <InfoTooltip
          isOpen={infoTooltipOpen}
          onClose={closeAllPopups}
          name="infotooltip"
          err={err}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
