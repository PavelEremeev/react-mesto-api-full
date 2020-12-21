import React from "react";

export default function ImagePopup({ isOpen, card, onClose }) {
    return (
        <div className={`popup popup_zoom ${isOpen ? `popup_opened` : ""}`}>
            <div className="popup__container">
                <img className="popup__image" src={card && card.link} />
                <button
                    type="button"
                    className="popup__close-button_zoom popup__close-button"
                    onClick={onClose}
                ></button>
                <p className="popup__caption">{card && card.name}</p>
            </div>
        </div>
    );
}
