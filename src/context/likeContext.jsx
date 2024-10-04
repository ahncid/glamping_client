import { createContext, useContext, useState, useEffect } from "react";

// kontekst, der kan deles med andre komponenter
const LikeContext = createContext();

// Custom hook, der bruges til at tilgå LikeContext i andre komponenter
export const useLikedActivities = () => {
  return useContext(LikeContext); // Brug af useContext for at tilgå LikeContext værdier og funktioner
};

// Provider komponent, der wrapper andre komponenter og deler likedActivityIds og toggleLike
export const LikeProvider = ({ children }) => {
  // useState hook til at initialisere likedActivityIds fra localStorage, eller sætter en tom liste hvis det ikke findes
  const [likedActivityIds, setLikedActivityIds] = useState(() => {
    const storedLikes = localStorage.getItem("likedActivityIds"); // Henter gemte likedActivityIds fra localStorage
    return storedLikes ? JSON.parse(storedLikes) : []; // Hvis der er gemte likes, parses de som et array, ellers starter vi med en tom liste
  });

  // useEffect hook til at gemme likedActivityIds i localStorage, når de opdateres
  useEffect(() => {
    // Opdaterer localStorage, hver gang likedActivityIds ændrer sig
    localStorage.setItem("likedActivityIds", JSON.stringify(likedActivityIds));
  }, [likedActivityIds]); // Effekten kører kun, når likedActivityIds ændrer sig (dependency array)

  // Funktion der enten tilføjer eller fjerner en aktivitet fra likedActivityIds
  const toggleLike = (activity) => {
    setLikedActivityIds((prevLikes) => {
      // Hvis aktiviteten allerede er liket (findes i arrayet), fjerner vi den
      if (prevLikes.includes(activity._id)) {
        return prevLikes.filter((id) => id !== activity._id); // Filter returnerer et array uden det valgte ID
      } else {
        // Hvis aktiviteten ikke er liket, tilføjes den ved at sprede tidligere likes og tilføje den nye
        return [...prevLikes, activity._id];
      }
    });
  };

  // LikeContext.Provider gør likedActivityIds og toggleLike tilgængelig for alle komponenter, der er wrapped i LikeProvider
  return (
    <LikeContext.Provider value={{ likedActivityIds, toggleLike }}>
      {children}{" "}
      {/* Renderer alle child-komponenter, der er wrapped i LikeProvider */}
    </LikeContext.Provider>
  );
};

/*
1. createContext: Opretter LikeContext, som kan bruges til at dele data og funktioner globalt i komponenttræet uden behov for at passere props manuelt mellem komponenter.
   
2. useContext: Bruges i useLikedActivities til at tilgå LikeContext værdier og funktioner. Gør det muligt for komponenter at få adgang til likedActivityIds og toggleLike.

3. useState: Initialiserer likedActivityIds fra localStorage ved første render. Hvis der ikke er gemt noget i localStorage, initialiseres likedActivityIds som et tomt array.
   
4. useEffect: Brugt til at gemme likedActivityIds i localStorage, når de opdateres. Dependency arrayet sørger for, at dette kun sker, når likedActivityIds ændrer sig.

5. localStorage: Web API, der bruges til at gemme data på klientens browser, så data forbliver mellem sessioner.

6. toggleLike: En funktion, der kontrollerer, om en aktivitet er liket (inkluderet i likedActivityIds array). Hvis den er, fjernes den fra arrayet, ellers tilføjes den.

7. Arrays: likedActivityIds er et array, som holder ID'erne på de aktiviteter, der er liket af brugeren.
   
8. Objects: activity-objekter sendes som argumenter til toggleLike, og deres _id bruges til at identificere, om de er liket.
   
9. Booleans: includes() bruges som en boolean kontrol til at afgøre, om en aktivitet allerede er liket (true) eller ej (false).
*/
