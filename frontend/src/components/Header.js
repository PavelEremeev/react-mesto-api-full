import React from "react";
import { Link, Route, Switch } from 'react-router-dom'
import logo from "../images/logo.svg";
import "../index.css";



function Header({ email, onSignOut, ...props }) {




  return (
    <Switch>
      <Route exact path="/">
        <header className="header">
          <div className={`header__menu ${props.onClickMenu ? `header__menu_open` : ""}`}>
            <div className="header__user">{email}</div>
            <Link to="/signup" onClick={onSignOut} className="header__user-link">Выйти</Link>
          </div>
          <div className="header__container">
            <img className="header__logo" src={logo} alt="logo.pic" />
            <div className="header__button-wrapper" onClick={props.onChangeHeaderMenu}>
              <button className={`header__button ${props.onClickMenu ? `header__button_active` : ""}`} /></div>
            <div className="header__user-container">
              <div className="header__user">{email}</div>
              <Link to="/signup" onClick={onSignOut} className="header__user-link">Выйти</Link>
            </div>
          </div>
        </header>
      </Route>
      <Route path="/signin">
        <header className="header">
          <div className="header__container">
            <img className="header__logo" src={logo} alt="logo.pic" />
            <div className="header__user-container header__user-container_logout">
              <Link to="/signup" className="header__user-link header__user-link_logout">Регистрация</Link>
            </div>
          </div>
        </header>
      </Route>
      <Route path="/signup">
        <header className="header">
          <div className="header__container">
            <img className="header__logo" src={logo} alt="logo.pic" />
            <div className="header__user-container header__user-container_logout">
              <Link to="/signin" className="header__user-link header__user-link_logout">Вход</Link>
            </div>
          </div>
        </header>
      </Route>
    </Switch>


  );
}

export default Header;
