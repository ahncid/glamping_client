import { useState, useEffect } from "react";
import { serverPath } from "../services/settings";

const useFetchActivities = () => {
  // Initialiserer state-variabler med useState hook
  // activities: Array som holder data om aktiviteter, initialiseret som et tomt array
  const [activities, setActivities] = useState([]);
  // loading: Boolean der indikerer om data er under indhentning, initialiseret som true
  const [loading, setLoading] = useState(true);
  // error: Objekt der holder eventuelle fejl ved dataindhentning, initialiseret som null
  const [error, setError] = useState(null);

  // useEffect hook bruges til at hente data, når komponenten mountes (komponenten første gang renderes)
  useEffect(() => {
    // Asynkron funktion til at hente data fra serveren
    const fetchActivities = async () => {
      try {
        // Fetch-anmodning til serveren for at hente aktivitetsdata, bruger serverPath
        const response = await fetch(`${serverPath}/activities`);
        // Parser response som JSON (response.json returnerer en Promise)
        const result = await response.json();
        // Tjekker om status er "ok" for at sikre, at dataen blev hentet korrekt
        if (result.status === "ok") {
          // Opdaterer activities state med de modtagne data
          setActivities(result.data);
        } else {
          // Hvis status ikke er "ok", kastes en fejl med beskeden fra serveren
          throw new Error(result.message);
        }
      } catch (err) {
        // Fanger eventuelle fejl og opdaterer error state med fejlobjektet
        setError(err);
      } finally {
        // Sætter loading til false, uanset om der opstod en fejl eller ej
        setLoading(false);
      }
    };

    // Kalder fetchActivities for at hente data
    fetchActivities();
  }, []); // Tomt dependency-array betyder, at hooket kun kører ved første render (componentDidMount)

  // Returnerer activities, loading, og error som et objekt
  return { activities, loading, error };
};

export default useFetchActivities;

/* 
1. useState: Bruges til at initialisere tre stykker state: activities (et array), loading (en boolean), og error (et objekt). 
   - activities holder de hentede aktiviteter.
   - loading bruges til at indikere, om data stadig er ved at blive hentet.
   - error holder en eventuel fejl, der opstår under dataindhentning.
   
2. useEffect: Bruges til at udføre dataindhentningen, når komponenten først renderes (componentDidMount). Hooket kører kun én gang på grund af tomt dependency-array.
   
3. fetch: Asynkron funktion, der sender en HTTP GET-anmodning til serveren for at hente data om aktiviteter (activities). 
   - response.json() parser data til et objekt, som derefter opdaterer activities state.
   
4. Error-handling: I tilfælde af en fejl under fetch-anmodningen, opdateres error state med fejlobjektet, og loading sættes til false for at stoppe indlæsningen.
   - Hvis serveren returnerer en status der ikke er "ok", kastes en fejl med serverens fejlbesked.

5. Finally-blok: Brugt til at sikre, at loading altid sættes til false, uanset om fetch-anmodningen lykkedes eller fejlede.

6. Return statement: Returnerer activities, loading, og error som et objekt, så disse værdier kan bruges i komponenter, der anvender hooket.

7. Booleans: `loading` er en boolean, der angiver, om dataindhentningen er i gang. Den sættes til false, når enten data er hentet, eller en fejl er fanget.

8. Objects: `error` er et objekt, der indeholder information om eventuelle fejl under dataindhentningen. Det returneres også som en del af hookets output.
*/
