import { useState, useEffect } from "react";
import { serverPath } from "../../../services/settings";

const useBackofficeActivities = () => {
  // State til at holde listen af aktiviteter
  const [activities, setActivities] = useState([]); // Array der holder de hentede aktiviteter
  const [loading, setLoading] = useState(true); // Boolean der angiver om data hentes fra serveren
  const [error, setError] = useState(null); // Holder eventuelle fejl under datahentning

  // Brug useEffect til at hente aktiviteter fra serveren ved komponentens mount
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${serverPath}/activities`); // Henter data fra serveren ved hjælp af fetch API'et
        const result = await response.json(); // Parser response som JSON
        setActivities(result.data); // Sætter activities state med data fra serveren
      } catch (err) {
        setError(err); // Sætter error state, hvis der opstår en fejl
      } finally {
        setLoading(false); // Indikerer at datahentningen er afsluttet
      }
    };

    fetchActivities(); // Kalder fetch funktionen
  }, []); // Tom dependency array, så useEffect kun kører ved mount

  // Tilføj en ny aktivitet
  const addActivity = async (newActivity, imageFile) => {
    const formData = new FormData(); // FormData bruges til at håndtere multipart/form-data, fx for at sende filer

    // Tilføjer aktivitetsdata til FormData objektet
    formData.append("title", newActivity.title);
    formData.append("description", newActivity.description);
    formData.append("date", newActivity.date);
    formData.append("time", newActivity.time);

    if (imageFile) {
      formData.append("file", imageFile); // Hvis der er et billede, tilføjes det til FormData
    }

    try {
      const response = await fetch(`${serverPath}/activity`, {
        method: "POST", // Brug POST-metoden til at tilføje en ny aktivitet
        body: formData, // Sender formData som request body
      });

      const result = await response.json(); // Parser response som JSON
      console.log("New activity response:", result);

      // Opdaterer state ved at tilføje den nye aktivitet til den eksisterende liste
      setActivities((prevActivities) => [...prevActivities, result.data]);
    } catch (err) {
      setError(err); // Håndterer fejl, hvis tilføjelsen mislykkes
    }
  };

  // Opdater en eksisterende aktivitet
  const updateActivity = async (id, updatedActivity, imageFile) => {
    const formData = new FormData(); // FormData bruges igen til at håndtere opdateringen, inklusive billede

    formData.append("id", id); // Tilføjer aktivitetens ID

    // Tilføjer kun felter, hvis de er blevet ændret
    if (updatedActivity.title) {
      formData.append("title", updatedActivity.title);
    }
    if (updatedActivity.description) {
      formData.append("description", updatedActivity.description);
    }
    if (updatedActivity.date) {
      formData.append("date", updatedActivity.date);
    }
    if (updatedActivity.time) {
      formData.append("time", updatedActivity.time);
    }

    if (imageFile) {
      formData.append("file", imageFile); // Tilføjer billede, hvis det findes
    }

    try {
      const response = await fetch(`${serverPath}/activity`, {
        method: "PUT", // PUT bruges til at opdatere en eksisterende aktivitet
        body: formData, // Sender formData som request body
      });

      const result = await response.json(); // Parser response som JSON

      // Opdaterer state ved at erstatte den opdaterede aktivitet
      setActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity._id === id ? { ...activity, ...result.data } : activity
        )
      );
    } catch (err) {
      setError(err); // Håndterer fejl, hvis opdateringen mislykkes
    }
  };

  // Slet en aktivitet
  const deleteActivity = async (id) => {
    try {
      const response = await fetch(`${serverPath}/activity/${id}`, {
        method: "DELETE", // DELETE-metoden bruges til at slette en aktivitet
      });

      if (response.ok) {
        // Hvis sletningen er vellykket, fjernes aktiviteten fra state
        setActivities((prevActivities) =>
          prevActivities.filter((activity) => activity._id !== id)
        );
      } else {
        throw new Error("Error deleting activity"); // Hvis sletningen fejler, kastes en fejl
      }
    } catch (err) {
      setError(err); // Håndterer fejl under sletning
    }
  };

  // Returnerer værdier og funktioner fra hooket, som kan bruges i andre komponenter
  return {
    activities, // Array af aktiviteter
    loading, // Boolean der indikerer om aktiviteterne stadig hentes
    error, // Eventuelle fejl under hentning, tilføjelse, opdatering eller sletning
    addActivity, // Funktion til at tilføje en ny aktivitet
    updateActivity, // Funktion til at opdatere en eksisterende aktivitet
    deleteActivity, // Funktion til at slette en aktivitet
  };
};

export default useBackofficeActivities;

/* 
- useState: Bruges til at opbevare aktivitetsdata, loading-tilstand og eventuelle fejl. Det gør det muligt at opdatere komponentens tilstand dynamisk.
- useEffect: Hook, der henter data, når komponenten mountes, og sætter aktiviteter i state. Det kaldes kun én gang ved hjælp af det tomme dependency array.
- fetch: Bruges til at foretage HTTP-anmodninger til serveren, både til at hente, opdatere, tilføje og slette aktiviteter.
- FormData: Bruges til at konstruere en form med aktivitetsdata og en valgfri billedfil. Dette er nødvendigt for at kunne sende filer i en multipart/form-data anmodning.
- setActivities: En funktion der opdaterer listen af aktiviteter i state, enten ved at tilføje, opdatere eller fjerne aktiviteter.
- async/await: Bruges til at håndtere asynkrone operationer såsom fetch-anmodninger, hvilket gør koden mere læsbar og struktureret.
*/
