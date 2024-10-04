import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuth = () => useContext(AuthContext);

/*

- useAuth gør det nemt at tilgå AuthContext, som er en global kontekst, der holder styr på autentificeringsstatus, brugerdata og login/logout-funktionalitet i applikationen.
- Den bruger React's useContext hook til at hente værdierne fra AuthContext.
- AuthContext er en kontekst, der blev oprettet tidligere i applikationen (med createContext) og bliver brugt som en "provider" for autentificeringsdata.


1. Når useAuth bliver kaldt i en komponent, vil den bruge useContext til at få adgang til AuthContext.
2. useContext(AuthContext) returnerer de data, som AuthContext.Provider har gjort tilgængelige, hvilket i dette tilfælde er autentificeringsdata (token, bruger, signIn, signOut, osv.).
3. Det gør det muligt for komponenter at få adgang til loginstatus og udføre handlinger som login og logout uden at skulle manuelt importere AuthContext i hver komponent.


const { user, signedIn, signIn, signOut } = useAuth();
- Her destruktureres værdierne fra AuthContext via useAuth, så man kan bruge det i hver komponent. 
*/
