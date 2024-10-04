import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./signinPage.module.css";

// SignInPage komponenten håndterer login-logik og brugergodkendelse
const SignInPage = () => {
  // State variabler til at holde email og password input fra brugeren
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signIn funktionen hentes fra useAuth hook og bruges til at logge brugeren ind
  const { signIn } = useAuth();

  // useNavigate hook fra React Router til at omdirigere brugeren efter succesfuld login
  const navigate = useNavigate();

  // handleSubmit håndterer formindsendelsen og kalder signIn-funktionen for at logge brugeren ind
  const handleSubmit = async (e) => {
    e.preventDefault(); // Forhindrer sideopdatering ved formindsendelse
    try {
      const user = await signIn(email, password); // Kalder signIn med email og password
      if (user.email === "admin@mediacollege.dk") {
        // Tjekker om brugeren er admin og omdirigerer til /beforeBackoffice
        navigate("/beforeBackoffice");
      } else {
        // Viser en advarselsbesked, hvis brugeren ikke er admin
        alert("Du har ikke adgang til Backoffice.");
      }
    } catch (error) {
      // Logger eventuelle fejl under login-processen og viser en besked til brugeren
      console.error("Login mislykkedes", error);
      alert(error.message || "Login mislykkedes. Prøv igen.");
    }
  };

  return (
    <div className={styles.signInContainer}>
      <h2>Backoffice Login</h2>
      {/* Form elementet håndterer brugernes input og indsendelse */}
      <form onSubmit={handleSubmit} className={styles.signInForm}>
        <div>
          <label>Email</label>
          {/* Input felt til email med tovejs-binding via onChange */}
          <input
            type="email"
            value={email} // Email state er bundet til inputfeltets værdi
            onChange={(e) => setEmail(e.target.value)} // Når brugeren skriver, opdateres email state med inputværdien
            //Tovejs-binding sikrer, at:
            //Inputfeltet altid viser den aktuelle værdi af password fra state.
            // Når brugeren ændrer værdien i inputfeltet, opdateres state automatisk med den nye værdi.
            required
          />
        </div>
        <div>
          <label>Password</label>
          {/* Input felt til password med tovejs-binding via onChange */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Knap til at indgive loginoplysninger, som trigger handleSubmit */}
        <button type="submit" className={styles.signInButton}>
          Log ind
        </button>
      </form>
    </div>
  );
};

export default SignInPage;

/*
1. useState Bruges til at håndtere komponentens lokale state, som holder brugerinput (email og password) i realtid, når brugeren indtaster oplysninger.

2. useAuth Custom hook, der trækker værdier fra autentificeringskonteksten (AuthContext). Den bruges her til at kalde signIn-funktionen, som udfører login-processen ved at sende brugerens legitimationsoplysninger til backend.

3. useNavigate En del af react-router-dom, der bruges til programmatisk navigation. Når brugeren logger ind succesfuldt, bruges navigate til at omdirigere dem til /beforeBackoffice.

4. handleSubmit Asynkron funktion, der håndterer formindsendelsen. Den forhindrer sideopdatering ved e.preventDefault(), kalder signIn-funktionen og bestemmer, om brugeren skal have adgang til /beforeBackoffice baseret på brugerens email (tjekker om de er en admin).

5. Form og input-felter Input-felterne for email og password bruger React's tovejs-databinding (via value og onChange), hvilket betyder, at når brugeren skriver i felterne, opdateres komponentens state automatisk med de nyeste værdier.

6. Fejlhåndtering I try-catch-blokken håndteres eventuelle fejl under login-processen, som f.eks. forkerte legitimationsoplysninger eller serverfejl, og en advarselsbesked vises til brugeren.

7. CSS-moduler: styles er et objekt, der indeholder klassenavne fra CSS-modulet. CSS-moduler bruges til at skopere stilark til komponenten for at undgå klassekonflikter på tværs af applikationen.
*/
