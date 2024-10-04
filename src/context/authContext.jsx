import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode"; // Bibliotek til at dekode JWT (JSON Web Tokens)
import { useNavigate, useLocation } from "react-router-dom";
import { serverPath } from "../services/settings";

// Opretter AuthContext som vil blive brugt til at dele autentificeringsdata globalt i applikationen
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // State til at holde autentificeringsdata (token) gemt i localStorage
  const [auth, saveAuth] = useLocalStorage("auth", {});
  // State til at holde brugerdata (dekodet fra JWT-tokenet)
  const [user, setUser] = useState({});

  // useLocation hook bruges til at få adgang til den nuværende route i React Router
  const location = useLocation();
  // useNavigate hook bruges til programmatisk navigation
  const navigate = useNavigate();

  // Ekstraher token fra auth-objektet, eller sæt den som en tom streng hvis ingen token findes
  const token = auth.token || "";

  // Funktion til at dekode og returnere brugerdata fra JWT-tokenet
  const getUser = () => {
    return token !== "" ? jwt_decode(token) : {}; // Hvis token findes, dekod den, ellers returner tomt objekt
  };

  // Boolean, der indikerer, om brugeren er logget ind baseret på tilstedeværelsen af en token
  const signedIn = !!auth.token;

  // useEffect til at overvåge ændringer i auth-tokenen eller brugerens route (location)
  useEffect(() => {
    if (auth.token) {
      // Hvis der er en gyldig token, dekod den for at hente brugerens data
      const currentUser = getUser();
      setUser(currentUser); // Gem brugerens data i state
    } else {
      setUser({}); // Hvis ingen token, nulstil brugerdata
      // Hvis brugeren prøver at tilgå en backoffice-side uden at være logget ind
      if (
        location.pathname.includes("backoffice") &&
        !location.pathname.includes("signin")
      ) {
        navigate("/backoffice/signin"); // Omdiriger til login-siden
      }
    }
  }, [location, auth.token, navigate]); // Effect kører, når location eller auth-token ændrer sig

  // Asynkron funktion til at håndtere brugerens login
  const signIn = async (email, password) => {
    try {
      // POST-anmodning til backend for at autentificere brugeren
      const response = await fetch(`${serverPath}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Send email og password som JSON-payload
      });

      const result = await response.json(); // Parse svaret fra serveren som JSON

      // Hvis login lykkes og token er modtaget
      if (response.ok && result.data && result.data.token) {
        const user = jwt_decode(result.data.token); // Dekod token for at hente brugerdata
        saveAuth({ token: result.data.token }); // Gem token i localStorage
        setUser(user); // Opdater brugerdata i state
        return user; // Returner brugerdata (kan bruges til yderligere logik)
      } else {
        throw new Error(result.message || "Login mislykkedes"); // Håndter fejl
      }
    } catch (error) {
      console.error("Error during sign in:", error); // Log eventuelle fejl
      throw error; // Kast fejlen videre for at håndtere den i UI
    }
  };

  // Funktion til at logge brugeren ud
  const signOut = () => {
    saveAuth({}); // Ryd token fra localStorage
    setUser({}); // Nulstil brugerdata
    navigate("/backoffice/signin"); // Omdiriger brugeren til login-siden
  };

  // Definerer de værdier, der skal gøres tilgængelige for alle komponenter, der bruger AuthContext
  const value = { token, user, getUser, signIn, signOut, signedIn };

  // Returnerer AuthContext.Provider som wrappes omkring børnene, hvilket gør autentificeringsdata tilgængelige i hele applikationen
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
