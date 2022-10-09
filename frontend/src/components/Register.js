import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    const data = {
      email,
      password,
    };
    onRegister(data);
  }

  return (
      <form className="form login__form" onSubmit={handleSubmit}>
        <p className="login__welcome">Sign up</p>
        <label className="login__input-wrapper">
          <input
            required
            id="email"
            name="email"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="login__input"
          />
        </label>
        <label className="login__input-wrapper">
          <input
            required
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="login__input"
          />
        </label>
        <button type="submit" className="popup__btn login__link">
          Sign up
        </button>
        <Link to="/signin" className="login__signup">
          Already a member? Log in here!
        </Link>
      </form>
  );
}

export default Register;