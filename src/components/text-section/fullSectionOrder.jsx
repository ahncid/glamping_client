import { useNavigate } from "react-router-dom";
import styles from "./fullSectionOrder.module.css";

function FullSectionComponent({
  title, // Titel, der skal vises som et string
  numberOfPersons, // Antal personer
  price, // Pris
  backgroundImage, // URL til baggrundsbillede, der vises som en string
  destination, // Destination, som komponenten navigerer til, som en string
}) {
  const navigate = useNavigate(); // Hook, der returnerer en funktion til at navigere til en ny rute

  // Funktion til at håndtere 'Læs mere'-knap klik og navigere til destination
  const handleReadMore = () => {
    console.log(`Navigating to: ${destination}`); // Logger destinationen til konsollen
    navigate(destination); // Kalder navigate-funktionen med destination som parameter for at skifte rute
  };

  // Debugging: Log props for at sikre, at de modtages korrekt
  console.log("numberOfPersons:", numberOfPersons);
  console.log("price:", price);

  return (
    <div className={styles.container}>
      {/* Tekstboks indeholder titlen, antal personer og pris */}
      <div className={styles.textBox}>
        <h3>{title}</h3> {/* Titel renderet som et h3-element */}
        <p>{numberOfPersons} personer</p> {/* Viser antal personer */}
        <p>Fra {price},-</p> {/* Viser prisen */}
      </div>

      {/* Baggrundsbillede indstillet ved hjælp af inline styles */}
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${backgroundImage})` }} // Bruger URL'en til at indstille baggrundsbilledet
      >
        <div className={styles.overlay}></div>
        {/* Overlay for at tone billedet */}
      </div>

      {/* Knap der udløser handleReadMore-funktionen ved klik */}
      <button className={styles.readMoreButton} onClick={handleReadMore}>
        Læs mere
      </button>
    </div>
  );
}

export default FullSectionComponent;

/* 
1. useNavigate: Bruges til at navigere programmatisk mellem ruter i applikationen. Ved at kalde navigate(destination) sendes brugeren til en ny URL.
   
2. Props: Komponentens props (title, numberOfPersons, Price, backgroundImage, destination) gør den dynamisk. Disse modtages som input og bruges til at vise relevant indhold.
   - title: En string, der bruges som overskrift i komponenten.
  
   - backgroundImage: URL til et billede, der bruges som baggrund i komponenten.
   - destination: En string, der repræsenterer ruten/URL'en, som brugeren navigeres til ved klik på "Læs mere"-knappen.

3. handleReadMore: En funktion, der logger destinationen og kalder navigate() for at ændre URL'en, når knappen trykkes.

4. Inline styles: Baggrundsbilledet for komponenten sættes dynamisk ved at bruge inline CSS styles (`backgroundImage`) baseret på URL'en sendt som prop.
*/
