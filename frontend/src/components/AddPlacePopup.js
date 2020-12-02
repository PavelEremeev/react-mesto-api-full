import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";


export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const inputName = useRef('');
    const inputLink = useRef('');


    function handleSubmit(e) {
        e.preventDefault()
        onAddPlace({
            name: inputName.current.value,
            link: inputLink.current.value
        })
        inputName.current.value = null;
        inputLink.current.value = null;
    }

    return (
        <PopupWithForm
            name="popup_new-place"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Создать mesto"
            formElement="popup__form_new-place"
            submitTitle="Создать mesto"
        ><input
                ref={inputName}
                className="popup__input popup__input_new-place_name"
                id="newplace-name-input"
                name="name"
                type="text"
                placeholder="Название"
                required
                minLength="1"
                maxLength="30"

            />
            <span
                className="popup__input-error"
                id="newplace-name-input-error"
            ></span>
            <input
                ref={inputLink}
                className="popup__input popup__input_new-place_link"
                id="newplace-link-input"
                name="link"
                type="url"
                placeholder="Ссылка на картинку"
                required
            />
            <span
                className="popup__input-error"
                id="newplace-link-input-error"
            ></span>
        </PopupWithForm>
    )
}