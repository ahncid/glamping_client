import { useState, useEffect } from "react";
import { serverPath } from "../services/settings";

const useFetchStays = () => {
  // Initialiserer state-variabler med useState hook
  // stays: Array som holder data om ophold, initialiseret som et tomt array
  const [stays, setStays] = useState([]);
  // loading: Boolean der indikerer om data er under indhentning, initialiseret som true
  const [loading, setLoading] = useState(true);
  // error: Objekt der holder eventuelle fejl ved dataindhentning, initialiseret som null
  const [error, setError] = useState(null);

  // useEffect hook bruges til at hente data, når komponenten mountes (komponenten første gang renderes)
  useEffect(() => {
    // Asynkron funktion til at hente data fra serveren
    const fetchStays = async () => {
      try {
        // Fetch-anmodning til serveren for at hente opholdsdata, bruger serverPath
        const response = await fetch(`${serverPath}/stays`);
        // Parser response som JSON (response.json returnerer en Promise)
        const data = await response.json();
        // Opdaterer stays state med de modtagne data
        setStays(data.data);
        // Sætter loading til false, da data er hentet
        setLoading(false);
      } catch (error) {
        // Fanger eventuelle fejl og opdaterer error state med fejlobjektet
        setError(error);
        // Sætter loading til false, selvom der opstod en fejl
        setLoading(false);
      }
    };

    // Kalder fetchStays for at hente data
    fetchStays();
  }, []); // Tom array som dependency betyder, at hooket kun kører ved første render (componentDidMount)

  // Returnerer stays, loading og error som et objekt
  return { stays, loading, error };
};

export default useFetchStays;

/* 
1. useState: Bruges til at initialisere tre stykker state: stays (et array), loading (en boolean), og error (et objekt). 
   - stays holder opholdsdata hentet fra serveren.
   - loading bruges til at indikere, om data stadig er ved at blive hentet.
   - error holder en eventuel fejl, der opstår under dataindhentning.
   
2. useEffect: Bruges til at udføre dataindhentningen, når komponenten først renderes (componentDidMount). Hooket kører kun én gang på grund af tomt dependency-array.
   
3. fetch: Asynkron funktion, der sender en HTTP GET-anmodning til serveren for at hente data om ophold (stays). 
   - response.json() parser data til et objekt, som derefter opdaterer stays state.

4. Error-handling: I tilfælde af en fejl under fetch-anmodningen, opdateres error state med fejlobjektet, og loading sættes til false for at stoppe indlæsningen.

5. Return statement: Returnerer stays, loading, og error som et objekt, så disse værdier kan bruges i komponenter, der anvender hooket.

6. Booleans: `loading` er en boolean, der angiver, om dataindhentningen er i gang. Den sættes til false, når enten data er hentet, eller en fejl er fanget.

7. Objects: `error` er et objekt, der indeholder information om eventuelle fejl under dataindhentningen. Det returneres også som en del af hookets output.

*/
