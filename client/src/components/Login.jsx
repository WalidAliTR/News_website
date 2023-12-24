import React, { useContext, useState , useEffect } from "react";
import logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { user : globalUser ,   loginUser } = useContext(AppContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(user);

    // check if user is empty
    if (user.email === "" || user.password === "") {
      toast.error("Please fill in all fields");
      return;
    }

    const response = await loginUser(user);
    if (response.status === 200) {
      toast.success("Login Successful");
      navigate("/");
    } else {
      toast.error("Login Failed");
    }
  };

  useEffect(() => {
    if(globalUser){
      navigate("/");
    }
  }, [])
  return (
    <div>
      <div className="login-container">
        <div className="login-wrapper">
          <Link to={"/"}>
            <img src={logo} alt="News Site Logo" className="logo" />
          </Link>
          <h1 className="animated-text">
            Stay Informed. <span className="highlight">Stay Engaged.</span>
          </h1>
          <p>Access exclusive news, personalized recommendations, and more.</p>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="username">Email</label>
              <input
                type="text"
                id="email"
                autoComplete="no-password"
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={handleChange} />
            </div>
            <button type="submit" className="animated-button">
              Log In
            </button>
          </form>
          <Link href="#">Forgot Password?</Link>
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
