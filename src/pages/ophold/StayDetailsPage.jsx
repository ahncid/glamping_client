import { useParams } from "react-router-dom";
import useFetchStays from "../../hooks/useFetchStays";
import StayDetails from "../../components/stays/StayDetails";

const StayDetailsPage = () => {
  const { id } = useParams(); // Henter ID fra URL'en
  const { stays, loading, error } = useFetchStays(); // Henter ophold fra backend

  // Kontrollerer, om data stadig hentes eller om der er opstået en fejl
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading stays: {error.message}</p>;

  // Finder det specifikke ophold baseret på ID
  const stay = stays.find((stay) => stay._id === id);

  // Definerer tilpasset tekst baseret på opholdets titel
  let customText = "";
  if (stay) {
    if (stay.title === "Romantisk Getaway") {
      customText = "Velkommen til vores Romantisk Getaway!";
    } else if (stay.title === "Familiepakken") {
      customText = "Velkommen til vores Familiepakke!";
    } else if (stay.title === "Weekendtur") {
      customText = "Tag væk en weekend, med én du holder af";
    }
  }

  // Renderer StayDetails-komponenten med tilpasset tekst
  return stay ? (
    <StayDetails stay={stay} customText={customText} />
  ) : (
    <p>Opholdet kunne ikke findes.</p> // Fallback-besked, hvis opholdet ikke findes
  );
};

export default StayDetailsPage;

// Kommentarer:
// 1. useParams: Bruges til at hente URL-parametre (id), så vi kan finde det specifikke ophold.
// 2. useFetchStays: Henter alle ophold fra backend.
// 3. Tilpasset tekst: Baseret på opholdets titel, sætter vi customText til en specifik besked.
// 4. Conditional rendering: Viser StayDetails-komponenten med den tilpassede tekst eller en fejlbesked.
