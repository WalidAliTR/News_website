import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div className="login-container">
        <div className="login-wrapper">
          <img src={logo} alt="News Site Logo" className="logo" />
          <h1 className="animated-text">
            Stay Informed. <span className="highlight">Stay Engaged.</span>
          </h1>
          <p>Access exclusive news, personalized recommendations, and more.</p>
          <form action="#">
            <div className="input-field">
              <label htmlFor="username">Username or Email</label>
              <input type="text" id="username" required />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" required />
            </div>
            <button type="submit" className="animated-button">
              Log In
            </button>
          </form>
          <a href="#">Forgot Password?</a>
          <p>
            Don't have an account? <Link to={"/signup"}>Sign Up</Link>
          </p>
        </div>
        <div className="particle-container">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
