import { useState, useEffect } from "react";
import { serverPath } from "../../../services/settings";

const useBackofficeSubscribers = () => {
  // State til at holde listen af users
  const [subscribers, setSubscribers] = useState([]); // Array til de hentede users
  const [loading, setLoading] = useState(true); // Boolean der indikerer om userne stadig hentes
  const [error, setError] = useState(null); // State til at opbevare eventuelle fejl under datahentning

  // Brug useEffect til at hente users fra /users endpointet ved komponentens mount
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch(`${serverPath}/users`); // Henter users fra serveren
        const result = await response.json(); // Parser response som JSON
        setSubscribers(result.data); // Sætter subscribers state med data fra serveren
      } catch (err) {
        setError(err); // Sætter fejl state, hvis der opstår en fejl
        console.error("Error fetching subscribers:", err); // Logger fejlen
      } finally {
        setLoading(false); // Indikerer at datahentningen er færdig
      }
    };

    fetchSubscribers(); // Kalder fetch funktionen
  }, []); // Tom dependency array, så useEffect kun kører ved mount

  // Tilføj en ny user
  const addSubscriber = async (newSubscriber, imageFile) => {
    const formData = new FormData(); // Opretter et FormData objekt til multipart/form-data

    // Tilføjer abonnentdata til FormData objektet
    formData.append("name", newSubscriber.name);
    formData.append("email", newSubscriber.email);
    formData.append("password", newSubscriber.password);
    formData.append("role", newSubscriber.role);

    if (imageFile) {
      formData.append("file", imageFile); // Tilføjer billedfil, hvis den er valgt
    }

    try {
      const response = await fetch(`${serverPath}/user`, {
        method: "POST", // POST anmodning for at tilføje en ny user
        body: formData, // Sender FormData som request body
      });

      const data = await response.json(); // Parser response som JSON
      // "Parser response som JSON" betyder at omdanne serverens rå tekstsvar til et brugbart JavaScript-objekt,
      // som kan manipuleres og anvendes i min kode
      console.log("New subscriber response:", data);

      // Opdaterer state med den nye user
      setSubscribers((prevSubscribers) => [...prevSubscribers, data.data]);
    } catch (err) {
      setError(err); // Håndterer fejl, hvis tilføjelsen mislykkes
      console.error("Error adding subscriber:", err);
    }
  };

  // Opdater en user
  const updateSubscriber = async (updatedSubscriber, imageFile) => {
    const formData = new FormData(); // FormData bruges igen til opdatering, inkl. billede

    formData.append("id", updatedSubscriber._id); // Tilføjer userens ID

    // Tilføjer kun felter, hvis de er blevet ændret
    if (updatedSubscriber.name) {
      formData.append("name", updatedSubscriber.name);
    }
    if (updatedSubscriber.email) {
      formData.append("email", updatedSubscriber.email);
    }
    if (updatedSubscriber.password) {
      formData.append("password", updatedSubscriber.password);
    }
    if (updatedSubscriber.role) {
      formData.append("role", updatedSubscriber.role);
    }

    if (imageFile) {
      formData.append("file", imageFile); // Tilføjer billede, hvis det findes
    }

    try {
      const response = await fetch(`${serverPath}/user`, {
        method: "PUT", // PUT anmodning for at opdatere en abonnent
        body: formData, // Sender FormData som request body
      });

      const data = await response.json(); // Parser response som JSON
      console.log("Updated subscriber response:", data);

      // Opdaterer state med den opdaterede abonnent
      setSubscribers((prevSubscribers) =>
        prevSubscribers.map((subscriber) =>
          subscriber._id === updatedSubscriber._id ? data.data : subscriber
        )
      );
    } catch (err) {
      setError(err); // Håndterer fejl, hvis opdateringen mislykkes
      console.error("Error updating subscriber:", err);
    }
  };

  // Slet en user
  const deleteSubscriber = async (id) => {
    try {
      const response = await fetch(`${serverPath}/user/${id}`, {
        method: "DELETE", // DELETE anmodning for at slette en abonnent
      });

      if (!response.ok) {
        throw new Error(`Error deleting subscriber: ${response.statusText}`); // Kaster en fejl, hvis sletningen fejler
      }

      // Opdaterer state ved at fjerne den slettede abonnent
      setSubscribers((prevSubscribers) =>
        prevSubscribers.filter((subscriber) => subscriber._id !== id)
      );
    } catch (err) {
      setError(err); // Håndterer fejl under sletning
      console.error("Error deleting subscriber:", err);
    }
  };

  // Returnerer users, loading tilstand, fejl, samt CRUD funktioner til users
  return {
    subscribers, // Array af users
    loading, // Boolean der indikerer om users stadig hentes
    error, // Eventuelle fejl under hentning, tilføjelse, opdatering eller sletning
    addSubscriber, // Funktion til at tilføje en ny abonnent
    updateSubscriber, // Funktion til at opdatere en eksisterende abonnent
    deleteSubscriber, // Funktion til at slette en abonnent
  };
};

export default useBackofficeSubscribers;

/* 
- useState: Bruges til at holde abonnentdata, loading-tilstand og eventuelle fejl i komponentens state.
- useEffect: Hook der kører ved komponentens mount, og henter users fra serveren.
- FormData: Bruges til at sende multipart/form-data, som er nødvendigt for at håndtere både tekst- og billeddata.
- fetch: Bruges til at foretage HTTP-anmodninger til serveren for at hente, tilføje, opdatere og slette users.
- setSubscribers: En funktion der opdaterer listen af users i state baseret på de handlinger der udføres (tilføjelse, opdatering, sletning).
- async/await: Bruges til at håndtere asynkrone operationer såsom fetch-anmodninger, hvilket gør koden mere læsbar og struktureret.
*/
