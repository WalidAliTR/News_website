import { createContext, useState, useEffect } from "react";

import axios from "axios";
export const AppContext = createContext();

// create default base url for axios
axios.defaults.baseURL = "http://localhost:5000";

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null || JSON.parse(localStorage.getItem("user")));



  // register user
  const registerUser = async (user) => {
    try {
      const response = await axios.post("/api/auth/register", user , {
        validateStatus : false
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // login user
  const loginUser = async (user) => {
    try {
      const response  = await axios.post("/api/auth/login", user , {
        validateStatus : false
      });
      console.log(response.data);
      setUser(response.data); // set user to state
      const savedUser = JSON.stringify(response.data);
      localStorage.setItem("user", savedUser); // save user to local storage
      return response;
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <AppContext.Provider
      value={{
        user,
        registerUser,
        loginUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
