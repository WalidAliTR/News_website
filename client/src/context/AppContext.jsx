import { createContext, useState } from "react";


import axios from "axios";
export const AppContext = createContext();

// create default base url for axios
axios.defaults.baseURL = "http://localhost:5000";

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    null || JSON.parse(localStorage.getItem("user"))
  );

  const [news, setNews] = useState([]);

  // register user
  const registerUser = async (user) => {
    try {
      const response = await axios.post("/api/auth/register", user, {
        validateStatus: false,
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
      const response = await axios.post("/api/auth/login", user, {
        validateStatus: false,
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

  // logout user
  const logoutUser = async () => {
    setUser(null);
    localStorage.removeItem("user");

    try {
      const response = await axios.get("/api/auth/logout", {
        validateStatus: false,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // get news 
  const getNews = async () => {
    try {
      const response = await axios.get("/api/news", {
        validateStatus: false,
      });
      setNews(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // get news by id 
  const getNewsById = async (id) => {
    try {
      const response = await axios.get(`/api/news/${id}`, {
        validateStatus: false,
      });
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
        logoutUser,
        getNews,
        getNewsById,
        news,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
