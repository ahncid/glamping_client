import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LikeProvider } from "./context/likeContext.jsx";
import { AuthContextProvider } from "./context/authContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/glamping_client">
      <AuthContextProvider>
        <LikeProvider>
          <App />
        </LikeProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// React context providers til at håndtere globale tilstande.
// Man undgår props drilling, fordi der her opbevares og deles data som flere komponenter har brug for.
