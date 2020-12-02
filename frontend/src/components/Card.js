import React, { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext'


function Card({ onClick, onCardDislike, onCardLike, onCardDelete, card, ...rest }) {
  const currentUser = useContext(CurrentUserContext)
  const isOwner = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) =>
    i._id === currentUser._id
  )

  const cardLikeButton = (`element__like-button ${isLiked ? 'element__like-button_active' : ''}`)

  function handleCardClick() {
    onClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDislikeClick() {
    onCardDislike(card)
  }

  return (
    <div className="element" {...rest}>
      <img className="element__image" onClick={handleCardClick} src={card && card.link} />
      <div className="element__item">
        <h3 className="element__text">{card && card.name}</h3>
        <div className="element__like-container">
          <button type="button"
            className={`${cardLikeButton}`}
            onClick={() => {
              if (isLiked) {
                handleDislikeClick()
              } else {
                handleLikeClick()
              }
            }}
          ></button>
          <h4 className="element__like-counter">{card && card.likes.length}</h4>
        </div>
        {isOwner && <button
          type="button"
          className="element__remove-button"
          onClick={handleDeleteClick}
        ></button>}
      </div>
    </div>
  );
}

export default Card;
