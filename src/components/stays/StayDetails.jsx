import styles from "./stayDetails.module.css";
import BookButton from "../buttons/BookButton";
import { getImageUrl } from "../../../utils/getImageHelper";

const StayDetails = ({ stay, customText }) => {
  return (
    <div className={styles.container}>
      {/* Image Container with Overlay */}
      <div className={styles.imageContainer}>
        <img
          src={getImageUrl(stay.image)}
          alt={stay.title}
          className={styles.image}
        />
        <div className={styles.overlay}></div>
        <h2 className={styles.stayTitle}>{stay.title}</h2>
      </div>

      {/* Custom Text mellem billedet og beskrivelsen */}
      {customText && (
        <p className={styles.customText}>{customText}</p> // Viser customText, hvis den er defineret
      )}

      {/* Description */}
      <p className={styles.stayDescription}>{stay.description}</p>

      {/* Resten af indholdet */}
      <ul className={styles.stayIncludes}>
        {stay.includes.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h4 className={styles.stayDetailsHeading}>Pris {stay.price},-</h4>
      <h4 className={styles.stayDetailsHeading}>
        Personer {stay.numberOfPersons}
      </h4>
      <BookButton
        destination="/kontakt"
        customStyles={{
          backgroundColor: "#829B97",
          border: "none",
          marginTop: "50px",
        }}
      />
    </div>
  );
};

export default StayDetails;

// Kommentarer:
// 1. Props: Modtager `stay` og `customText` som props.
// 2. Conditional rendering: Viser `customText`, hvis den er defineret.
// 3. Resten af komponenten viser opholdets detaljer.
