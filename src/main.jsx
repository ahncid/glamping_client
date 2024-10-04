import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LikeProvider } from "./context/likeContext.jsx";
import { AuthContextProvider } from "./context/authContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <LikeProvider>
          <App />
        </LikeProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
