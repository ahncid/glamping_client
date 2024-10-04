import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./beforeBackofficePage.module.css";

const BeforeBackofficePage = () => {
  const { signedIn, user, signOut } = useAuth(); // Henter signedIn, user og signOut funktioner fra AuthContext
  const navigate = useNavigate(); // useNavigate bruges til at omdirigere brugeren

  // Funktion til at navigere til en ny route, afhængigt af om brugeren er logget ind og er admin
  const handleBeforeBackofficeClick = (path) => {
    if (signedIn && user.email === "admin@mediacollege.dk") {
      navigate(path); // Hvis brugeren er logget ind som admin, naviger til den ønskede path
    } else {
      navigate("/backoffice/signin"); // Hvis brugeren ikke er logget ind, omdiriger til login-siden
    }
  };

  // Funktion til at logge brugeren ud ved at kalde signOut og derefter omdirigere
  const handleLogout = () => {
    signOut(); // Kalder signOut funktionen, som fjerner brugerens autentificeringsdata
  };

  return (
    <div className={styles.beforeBackofficeContainer}>
      <h1>Velkommen til Backoffice</h1>
      <p>Vælg en af nedenstående sektioner:</p>
      <div className={styles.linksContainer}>
        {/* Knap til at navigere til Backoffice, afhængigt af om brugeren er admin */}
        <button
          onClick={() => handleBeforeBackofficeClick("/backoffice")}
          className={styles.linkButton}
        >
          Gå til Backoffice
        </button>
        {/* Knap til at navigere til Backoffice Contact, afhængigt af om brugeren er admin */}
        <button
          onClick={() => handleBeforeBackofficeClick("/backofficeContact")}
          className={styles.linkButton}
        >
          Gå til Backoffice Contact
        </button>
      </div>
      {/* Log ud-knap, der kalder handleLogout funktionen */}
      <button onClick={handleLogout} className={styles.logoutButton}>
        Log ud
      </button>
    </div>
  );
};

export default BeforeBackofficePage;

/*

1. useNavigate: Bruges til programmatisk navigation i React Router. Når brugeren klikker på en knap, kan de omdirigeres til en ny rute ved hjælp af navigate.

2. useAuth: Henter autentificeringsdata fra AuthContext, inklusive om brugeren er logget ind (`signedIn`), brugerens data (`user`), og log-ud-funktionen (`signOut`).

3. handleBeforeBackofficeClick: Funktion, der kontrollerer, om brugeren er logget ind og er admin (ved at tjekke user.email). Hvis betingelserne er opfyldt, navigeres der til den ønskede route (backoffice eller backofficeContact). Hvis ikke, navigeres brugeren til login-siden.

4. handleLogout: Funktion, der kalder signOut fra AuthContext for at logge brugeren ud. Denne funktion rydder brugerens autentificeringsdata og kan bruges til at omdirigere brugeren efter logout.

5. Betinget navigation: Brugeren kan kun navigere til backoffice-sider, hvis de er logget ind som admin. Hvis ikke, bliver de omdirigeret til login-siden.

6. Log ud-knap: Når brugeren klikker på "Log ud"-knappen, kaldes handleLogout, som fjerner brugerens loginstatus og eventuelle gemte autentificeringsdata.
*/
