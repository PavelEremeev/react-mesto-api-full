import React, { useRef } from "react"
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const inputAvatar = useRef('')

    function handleSubmit(e) {
        e.preventDefault(e)
        onUpdateAvatar({
            avatar: inputAvatar.current.value
        })
    }

    return (
        <PopupWithForm
            name="popup_avatar"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Обновить аватар"
            formElement="popup__form_avatar"
            submitTitle="Сохранить"
            children={
                <>
                    <input
                        ref={inputAvatar}
                        className="popup__input popup__input_avatar"
                        id="avatar-link-input"
                        name="avatar"
                        type="url"
                        placeholder="Ссылка на аватар"
                        required
                    />
                    <span
                        className="popup__input-error"
                        id="avatar-link-input-error"
                    ></span>
                </>
            }
        />
    )
}