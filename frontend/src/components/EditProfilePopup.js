import React, { useContext, useState, useEffect } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext)

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');

    useEffect(() => {
        setName(currentUser.name)
        setAbout(currentUser.about)
    }, [currentUser])

    function handleNameUpdate(e) {
        setName(e.target.value);
    }

    function handleAboutUpdate(e) {
        setAbout(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: about
        })
        e.target.reset()
    }

    return (
        <PopupWithForm
            name=""
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Редактировать профиль"
            formElement=""
            submitTitle="Сохранить"

        >
            <input
                className="popup__input popup__input_name"
                pattern="[a-zA-ZА-ЯЁа-яё\s\-]+[^\s\-]+"
                id="name-input"
                type="text"
                name="name"
                placeholder="Имя"
                required
                minLength="2"
                maxLength="40"
                onChange={handleNameUpdate}
                defaultValue={name}
            />
            <span className="popup__input-error" id="name-input-error"></span>
            <input
                className="popup__input popup__input_job"
                id="job-input"
                type="text"
                name="about"
                pattern="[a-zA-ZА-ЯЁа-яё\s\-]+[^\s\-]+"
                placeholder="Профессия"
                required
                minLength="2"
                maxLength="200"
                onChange={handleAboutUpdate}
                defaultValue={about}
            />
            <span className="popup__input-error" id="job-input-error"></span>
        </PopupWithForm>
    )
}