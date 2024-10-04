import { useState, useEffect } from "react";
import styles from "./backofficeContactPage.module.css";
import { serverPath } from "../../services/settings";
import { useNavigate } from "react-router-dom";

// BackofficeContactPage komponenten viser indkomne beskeder og henter dem fra en API.
const BackofficeContactPage = () => {
  // State til at holde beskederne, loading status og eventuelle fejl.
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // useEffect hook til at hente beskeder fra serveren, når komponenten mountes. = hvor en React-komponent første gang bliver tilføjet til DOM'en (Document Object Model)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Henter beskeder fra API'et.
        const response = await fetch(`${serverPath}/contacts`);
        const data = await response.json();
        console.log("Fetched data:", data);
        // Opdaterer state med de hentede beskeder.
        setMessages(data.data);
        // Skifter loading til false, når data er hentet.
        setLoading(false);
      } catch (error) {
        // Hvis der opstår en fejl, opdateres error state og loading sættes til false.
        setError(error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []); // Tom dependency array sikrer, at effekten kun kører ved første render.

  // Returnerer en loading-tekst, hvis data stadig hentes.
  if (loading) return <p>Loading messages...</p>;
  // Returnerer en fejlmeddelelse, hvis der opstod en fejl under hentning af data.
  if (error) return <p>Error loading messages: {error.message}</p>;

  const handleClick = (path) => {
    navigate(path); // Brug navigate-funktionen til at omdirigere
  };

  return (
    <div className={styles.backofficeContactContainer}>
      <h2>Indkomne Beskeder</h2>
      <button
        onClick={() => handleClick("/backoffice")}
        className={styles.linkButton}
      >
        Gå til Backoffice
      </button>
      {/* Viser en besked, hvis der ikke er nogen beskeder hentet */}
      {messages.length === 0 ? (
        <p>Ingen beskeder fundet.</p>
      ) : (
        <ul className={styles.messageList}>
          {/* Mapper gennem beskederne og viser hver besked i en liste */}
          {messages.map((message) => (
            <li key={message._id} className={styles.messageItem}>
              <h3>{message.name}</h3>
              <p>
                <strong>Email:</strong> {message.email}
              </p>
              <p>
                <strong>Emne:</strong> {message.subject}
              </p>
              <p>
                <strong>Besked:</strong> {message.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BackofficeContactPage;

/* 
- BackofficeContactPage: Komponent, der håndterer visning af beskeder fra en backoffice API.
- useState: Brugt til at holde styr på beskeder, loading-tilstand og fejltilstand.
- useEffect: Bruges til at hente beskeder, når komponenten loader første gang. Effekten kører kun én gang, takket være det tomme dependency array.
- fetchMessages: Asynkron funktion, der henter beskeder fra API'et og opdaterer state. Fejl håndteres og vises i UI'et, hvis de opstår.
- loading: Viser en loading-tekst, mens beskederne hentes.
- error: Viser en fejlmeddelelse, hvis der er opstået en fejl under datahentning.
- messages.map: Itererer over de hentede beskeder og viser dem i en liste.

- Prøvede her at lave en delete-knap, men kunne ikke få det til at virke. Ser i Postman at der ingen CRUD-handling er for DELETE
- Så tænkte at det er noget med backenden?
*/
