import { useState } from "react";
import BookButton from "../buttons/BookButton";
import styles from "./contactForm.module.css";
import { serverPath } from "../../services/settings";

function ContactForm() {
  // State til at holde formularens data: navn, email, emne og besked
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // State til at håndtere om formularen er blevet indsendt
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Funktion til at håndtere ændringer i inputfelterne, opdaterer formData state
  const handleChange = (e) => {
    setFormData({
      ...formData, // Kopier det eksisterende formData
      [e.target.name]: e.target.value, // Opdater det felt, der er ændret
    });
  };

  // Funktion til at håndtere formularindsendelse, sender data til serveren
  const handleSubmit = async (e) => {
    e.preventDefault(); // Forhindrer standardindsendelse af formular (som normalt opdaterer siden)

    try {
      // Send POST-anmodning til backend med formularens data
      const response = await fetch(`${serverPath}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Angiver at payloaden er JSON
        },
        body: JSON.stringify(formData), // Konverter formData til JSON-streng
      });

      if (response.ok) {
        setFormSubmitted(true); // Hvis indsendelse lykkes, opdater formSubmitted state
      } else {
        console.error("Error submitting the form"); // Hvis indsendelsen fejler, log en fejl
      }
    } catch (error) {
      console.error("Error:", error); // Hvis der opstår en undtagelse under indsendelsen, log fejlen
    }
  };

  // Funktion til at håndtere "Tilbage"-knappen, omdirigerer til forsiden
  const handleBackToForm = () => {
    window.location.href = import.meta.env.BASE_URL;
  };

  // Hvis formularen er blevet indsendt, vis en bekræftelsesbesked
  if (formSubmitted) {
    return (
      <div className={styles.overlay}>
        <div className={styles.messageContainer}>
          <h4>Hej {formData.name},</h4>
          <h4> Tak for din besked!</h4>
          <h6>Du hører fra os snarest.</h6>
          {/* BookButton komponent til "Tilbage"-knappen */}
          <BookButton
            buttonText="Tilbage"
            customStyles={{
              backgroundColor: "#829B97",
              width: "100%",
              margin: "25px auto",
            }}
            onClick={handleBackToForm} // Omdirigerer til forsiden ved klik
          />
        </div>
      </div>
    );
  }

  // Hvis formularen ikke er indsendt, vis kontaktformularen
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Navn input felt */}
      <div className={styles.formGroup}>
        <label htmlFor="name">Navn</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange} // Opdater formData ved ændringer
          required
        />
      </div>

      {/* Email input felt */}
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Emne input felt */}
      <div className={styles.formGroup}>
        <label htmlFor="subject">Hvad drejer henvendelsen sig om?</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>

      {/* Besked textarea felt */}
      <div className={styles.formGroup}>
        <label htmlFor="message">
          Besked (Skriv dato’er, hvis det drejer sig om en booking)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
        />
      </div>

      {/* Indsend knap */}
      <BookButton
        buttonText="Indsend"
        customStyles={{
          backgroundColor: "#829B97",
          width: "70%",
          margin: "25px auto",
        }}
      />
    </form>
  );
}

export default ContactForm;

/*

1. useState: Bruges til at styre komponentens lokale state, som indeholder data for formularens felter (name, email, subject, message) samt formSubmitted, der indikerer, om formularen er blevet indsendt.

2. handleChange: Funktion der håndterer ændringer i inputfelterne. Når brugeren indtaster eller ændrer et felt, opdateres formData state dynamisk.

3. handleSubmit: Funktion der håndterer formularindsendelsen. Den sender en POST-anmodning til serveren med formularens data (formData). Hvis indsendelsen lykkes, opdateres formSubmitted, som viser en bekræftelsesbesked.

4. handleBackToForm: Funktion der håndterer knappen "Tilbage", som omdirigerer brugeren tilbage til forsiden ("/") efter en succesfuld indsendelse.

5. Betinget rendering: Hvis formularen er indsendt, vises en bekræftelsesbesked. Hvis ikke, vises formularen. Dette er styret af formSubmitted state.

6. BookButton: Komponent, der bruges til at vise knapper. Den bruges både til indsendelse af formularen og til "Tilbage"-knappen efter indsendelse.

*/
