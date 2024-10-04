import { useState } from "react"; // Import af useState hook til at styre lokal komponent-state
import { icons } from "../../services/icons"; // Import af ikonressourcer
import styles from "./activitySection.module.css"; // Import af CSS-moduler til styling

function ActivitySection({
  dynamicText, // String der repræsenterer dynamisk tekst, som vises i komponenten
  backgroundImage, // URL til baggrundsbillede, som bruges i inline style
  leftText1, // Første tekstafsnit der vises på venstre side
  leftText2, // Andet tekstafsnit der vises på venstre side
  expandedText, // Tekst, der vises når komponenten udvides
  isLiked, // Boolean prop der angiver om aktiviteten er liket
  onToggleLike, // Funktion der toggler like-status når brugeren klikker på ikonet
}) {
  // State til at holde styr på, om komponenten er udvidet eller ej
  const [isExpanded, setIsExpanded] = useState(false);

  // Funktion til at toggle isExpanded state mellem true og false
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.container}>
      {/* TopBox viser dynamicText */}
      <div className={styles.topBox}>
        <p>{dynamicText}</p>
      </div>

      <div
        className={styles.background}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className={styles.overlay}></div>
      </div>

      {/* Content container til tekst og ikoner */}
      <div className={styles.contentContainer}>
        <div className={styles.textAndIconContainer}>
          <div className={styles.leftText}>
            <p>{leftText1}</p>
            <p>{leftText2}</p>
          </div>

          {/* Ikon, der skifter farve baseret på om aktiviteten er liket */}
          <div
            className={styles.icon}
            onClick={onToggleLike} // Toggler like-status ved klik
            style={{ color: isLiked ? "red" : "rgba(255, 255, 255, 0.18)" }}
          >
            {icons.heart}
          </div>
        </div>

        {/* Knap til at udvide eller skjule den udvidede tekst */}
        <button className={styles.readMoreButton} onClick={toggleExpand}>
          {isExpanded ? "Læs mindre" : "Læs mere"}{" "}
          {/* Ternary operator til at vise Læs mindre/mere */}
          {isExpanded ? icons.arrowUp : icons.arrowDown}{" "}
          {/* Viser pil op/ned */}
        </button>

        {/* Conditional rendering: Udvidet tekst vises kun hvis isExpanded er true */}
        {isExpanded && (
          <div className={styles.expandedText}>
            <p>{expandedText}</p> {/* Udvidet tekst */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivitySection;

/* 
1. useState: Bruges til at styre `isExpanded` state, der holder styr på, om komponenten er udvidet eller ej. `isExpanded` er en boolean.
   
2. Props: 
   - dynamicText, leftText1, leftText2, expandedText, backgroundImage, og isLiked er alle props, der modtages fra en overordnet komponent. 
   - Propsene styrer, hvad der vises i ActivitySection, f.eks. om aktiviteten er liket eller ej, og hvilken tekst og baggrund der vises.
   
3. onToggleLike: Funktion, der modtages som prop og bruges til at skifte like-status, når brugeren klikker på hjertesymbolet.

4. Conditional rendering: `isExpanded` bruges til at bestemme, om den udvidede tekst skal vises. Dette sker ved hjælp af en ternary operator i knapteksten og en `&&` operator til at vise den udvidede tekst.

5. Inline style: `backgroundImage` bruges direkte i `style` attributten med en template literal for at dynamisk sætte baggrundsbilledet via URL'en.

6. icons: Ikoner som hjertesymbolet og pilene til Læs mere/mindre hentes fra en ikonservice (icons object) og vises dynamisk baseret på komponentens tilstand.
*/
