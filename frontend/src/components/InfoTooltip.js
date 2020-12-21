import React from "react"
import successPicture from "../images/successPicture.svg";
import accessDenied from "../images/accessDenied.svg";


const InfoTooltip = ({ onClose, status, isOpen }) => {

    const loginInfo = {
        success: 'Вы успешно зарегистрировались!',
        denied: 'Что-то пошло не так! Попробуйте ещё раз.'
    }

    return (

        <div className={`popup ${isOpen ? `popup_opened` : ""}`}>
            <div className="popup__form-login">
                <button
                    className="popup__close-button popup__close-button_login"
                    type="button"
                    onClick={onClose}
                ></button>
                <img className="popup__image-login" src={status ? successPicture : accessDenied} />
                <h2 className="popup__text-login">
                    {status ? loginInfo.success : loginInfo.denied}
                </h2>
            </div>
        </div>
    )
}


export default InfoTooltip