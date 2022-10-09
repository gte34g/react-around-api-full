import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../images/Header-logo.svg";

function Header({ onSignOut, email }) {
  
  function handleSignOut() {
    onSignOut();
  }
  return (
    <header className="header">
      <img src={logo} alt="Around the U.S." className="header__logo" />
      <Route exact path="/">
        <div className="header__right">
          <p className="header__user header__layout">{email}</p>
          <button
            className="header__logout header__layout"
            onClick={handleSignOut}
          >
            Log out
          </button>
        </div>
      </Route>
      <Route path="/signup">
        <Link className="header__auth-link header__layout" to="signin">
          Sign in
        </Link>
      </Route>
      <Route path="/signin">
        <Link className="header__auth-link header__layout" to="signup">
          Sign up
        </Link>
      </Route>
    </header>
  );
}

export default Header;
