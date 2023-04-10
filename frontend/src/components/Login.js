import React from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const handleSubmit = (e) => {
      e.preventDefault();
    const data = {
      email,
      password,
    };
    console.log(data);
    onLogin(data);
  };
  
  return (
      <form className="form login__form" onSubmit={handleSubmit}>
        <p className="login__welcome">Log in</p>
        <label className="login__input-wrapper">
          <input
            className="login__input"
            name="name"
            type="text"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="login__input-wrapper">
          <input
            className="login__input"
            name="password"
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="popup__btn login__link">
          Log in
        </button>
        <Link to="/signup" className="login__signup">
          Not a member yet? Sign up here!
        </Link>
      </form>
  );
}

export default Login;