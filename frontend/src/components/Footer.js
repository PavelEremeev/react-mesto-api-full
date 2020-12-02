import React from "react";
import { Route, Switch } from "react-router-dom";
import "../index.css";

function Footer() {
  function getFullYear() {
    const newYear = new Date().getFullYear();
    return newYear;
  }

  return (
    <Switch>
      <Route exact path="/">
        <footer className="footer">
          <p className="footer__copyright">&copy; {getFullYear()} Mesto Russia by Pavel Eremeev</p>
        </footer>
      </Route>
      <Route path="/signin"><div></div></Route>
      <Route path="/signup"><div></div></Route>
    </Switch>

  );
}

export default Footer;
