import React, { useContext, useState } from "react";
import logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

import { toast } from "react-hot-toast";

const Signup = () => {
  const { registerUser } = useContext(AppContext);
  const navigate = useNavigate();

  // create state variables for each input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // handle inputs change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // -----------------------------------------

  // handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // if fields are empty
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    // create user object
    const user = {
      username,
      email,
      password,
    };

    // call registerUser function from AppContext
    const response = await registerUser(user);
    if (response.status === 201) {
      toast.success("Registration successful");
      // clear inputs
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      // redirect to login page
      navigate("/login");
    }else if(response.status === 409){
      toast.error(response.data);
    }else{
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-wrapper">
          <Link to="/">
            <img src={logo} alt="News Site Logo" className="logo" />
          </Link>
          <h1 className="animated-text">
            Stay Informed. <span className="highlight">Stay Engaged.</span>
          </h1>
          <p>Access exclusive news, personalized recommendations, and more.</p>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                autoComplete="no-password"
                onChange={handleUsernameChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="username">Email</label>
              <input
                type="text"
                id="email"
                autoComplete="no-password"
                onChange={handleEmailChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="cofirm_password"
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <button type="submit" className="animated-button">
              Signup
            </button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login Now</Link>
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

export default Signup;
