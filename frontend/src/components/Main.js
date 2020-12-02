import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { CurrentCardsContext } from '../contexts/CurrentСardsContext'

function Main(props) {

  const currentUser = useContext(CurrentUserContext);
  const currentCards = useContext(CurrentCardsContext);

  return (
    <main>
      <div>
        <section className="profile">
          <div className="profile__container">
            <button
              className="profile__avatar"
              type="button"
              onClick={props.onClickAvatar}
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            ></button>
            <div className="profile__author-card">
              <div className="profile__text-container">
                <h1 className="profile__text">{currentUser.name}</h1>
                <p className="profile__subtext">{currentUser.about}</p>
              </div>
              <button
                type="button"
                className="profile__edit-button"
                onClick={props.onClickProfile}
              ></button>
            </div>
          </div>
          <button
            type="button"
            className="profile__add-button"
            onClick={props.onClickNewPlace}
          ></button>
        </section>
        <section className="elements">
          {currentCards.map((card) => (
            <Card card={card}
              key={card._id}
              onClick={props.onCardClick}
              onCardDelete={props.onCardDelete}
              onCardLike={props.onCardLike}
              onCardDislike={props.onCardDislike}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

export default Main;
