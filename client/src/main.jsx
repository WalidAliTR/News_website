import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppContextProvider } from "./context/AppContext";

import { BrowserRouter } from "react-router-dom";

// toast notification
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster
        toastOptions={{
          position: "top-center",
          style: {
            borderRadius: "5px",
            background: "black",
            color: "white",
          },
        }}
      />
    </AppContextProvider>
  </React.StrictMode>
);
