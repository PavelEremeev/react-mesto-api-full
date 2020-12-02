import React, { useState, useEffect, useCallback } from "react";
import { useHistory, Switch, Route, Redirect } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import api from "../utils/api.js";
import { getToken, setToken, removeToken } from "../utils/token";
import * as mestoAuth from "../mestoAuth"
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import { CurrentCardsContext } from "../contexts/CurrentСardsContext"
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";



function App() {
  // Хуки-состояния
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(false)
  const [isHeaderMenuOpen, setHeaderMenuOpen] = useState(false)
  const [isAuthPopupOpen, setIsAuthPopupPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    link: "",
    name: "",
  });
  const [currentUser, setCurrentUser] = useState({})
  const [currentCards, setCurrentCards] = useState([])

  const history = useHistory();

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getItems()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCurrentCards(initialCards);
      })
      .catch((err) => console.log(err));
  }, []);




  // Функции открытия попапов
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(props) {
    setSelectedCard({
      isOpen: true,
      link: props.link,
      name: props.name,
    });
  }

  const handleHeaderMenu =
    useCallback(() =>
      setHeaderMenuOpen(prev => !prev),
      [setHeaderMenuOpen]);



  // Хендлеры карточки 
  function handleDeleteClick(card) {
    api.deleteItem(card)
      .then(() => {
        const newCardList = currentCards.filter(item => item._id !== card._id);
        setCurrentCards(newCardList);
      }).catch(err => console.log(err))
  }

  function handleLikeClick(card) {
    api.putLike(card._id)
      .then((newCard) => {
        const newCardList = currentCards.map((c) => c._id === card._id ? newCard : c)
        setCurrentCards(newCardList)
      }).catch(err => console.log(err))
  }

  function handleDislikeClick(card) {
    api.deleteLike(card._id)
      .then((newCard) => {
        const newCardList = currentCards.map((c) => c._id === card._id ? newCard : c)
        setCurrentCards(newCardList)
      }).catch(err => console.log(err))
  }

  function handleUserRegister(email, password) {
    mestoAuth.register(email, password).then((res) => {
      if (res.data._id) {
        setStatus(true)
        setIsAuthPopupPopupOpen(true)
        history.push('/signin');
      }
    }).catch(err => {
      console.log(err)
      setStatus(false)
      setIsAuthPopupPopupOpen(true)
    })
  }

  function handleUserLogin(email, password) {
    mestoAuth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token)
          setEmail(email)
          setLoggedIn(true)
          history.push('/')
        }
      })
      .catch(err => console.log(err))
  }




  // Проверка токена

  function tokenCheck() {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    mestoAuth.getContent(jwt)
      .then((data) => {
        if (data) {
          console.log(data)
          setLoggedIn(true)
          setEmail(data.data.email)
          history.push('/')
        }
      }).catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  // Удаляем токен из localStorage

  function signOut() {
    removeToken()
  }

  // Хендлер закрытия попапов
  function handleClosePopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({
      isOpen: false,
      link: "",
      name: "",
    });
    setIsAuthPopupPopupOpen(false)
  }

  // Хендлеры cабмитов попапов

  function handleAppPlaceSubmit(card) {
    api.createItem(card)
      .then((card) => {
        setCurrentCards([card, ...currentCards]);
        handleClosePopups()
      }).catch(err => console.log(err))
  }

  function handleUpdateUser(userInfo) {
    api.updateUserInfo(userInfo)
      .then((userInfo) => {
        setCurrentUser(userInfo)
        handleClosePopups()
      }).catch(err => console.log(err))
  }

  function handleUpdateAvatar(userInfo) {
    api.updateUserImage(userInfo)
      .then((userInfo) => {
        setCurrentUser(userInfo)
        handleClosePopups()
      }).catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardsContext.Provider value={currentCards}>
        <div className="page">
          <Header email={email} onClickMenu={isHeaderMenuOpen} onChangeHeaderMenu={handleHeaderMenu} onSignOut={signOut} />
          <Switch>
            <ProtectedRoute exact path='/'
              loggedIn={loggedIn}
              component={Main}
              onClickAvatar={handleEditAvatarClick}
              onClickProfile={handleEditProfileClick}
              onClickNewPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardDelete={handleDeleteClick}
              onCardLike={handleLikeClick}
              onCardDislike={handleDislikeClick}
              profileIsOpen={isEditProfilePopupOpen}
              avatarIsOpen={isEditAvatarPopupOpen}
              newPlaceIsOpen={isAddPlacePopupOpen}
              card={selectedCard}>
            </ProtectedRoute>
            <Route path="/signin"><Login onLogin={handleUserLogin} /></Route>
            <Route path="/signup"><Register onRegister={handleUserRegister} /></Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signup" />}
            </Route>
          </Switch>
          <Footer loggedIn={loggedIn} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={handleClosePopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={handleClosePopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={handleClosePopups}
            onAddPlace={handleAppPlaceSubmit}
          />
          <InfoTooltip isOpen={isAuthPopupOpen} onClose={handleClosePopups} status={status} />
          <ImagePopup isOpen={selectedCard.isOpen} card={selectedCard} onClose={handleClosePopups} />
          {/* <PopupWithForm
        popupClassName="popup_confirm"
        isOpen={isOpen}
        children={
          <>
            <div className="popup__form_confirm popup__form">
              <button
                className="popup__close-button"
                type="button"
                onClick={handleClosePopups}
              ></button>
              <h2 className="popup__text_confirm popup__text">Вы уверены?</h2>
              <button className="popup__submit-button" type="submit">
                Да
              </button>
            </div>
          </>
        }
      /> */}
        </div>
      </CurrentCardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
