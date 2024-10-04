import { useState } from "react";
import styles from "./subscriberForm.module.css";

// SubscriberForm komponenten modtager en onAdd prop og bruges til at oprette en ny subscriber
const SubscriberForm = ({ onAdd }) => {
  // State til at holde værdier for formularfelterne
  const [name, setName] = useState(""); // String for navnet på subscriber
  const [email, setEmail] = useState(""); // String for email på subscriber
  const [role, setRole] = useState("guest"); // Standard rolle er "guest", kan ændres til "admin"
  const [password, setPassword] = useState(""); // String for adgangskoden
  const [imageFile, setImageFile] = useState(null); // Holder billedefilen, hvis der uploades et billede

  // Håndterer formularens submit event
  const handleSubmit = (e) => {
    e.preventDefault(); // Forhindrer standard formularindsendelse, som ville reloade siden

    // Opretter et objekt for den nye subscriber baseret på inputværdierne
    const newSubscriber = {
      name, // Subscriber's navn
      email, // Subscriber's email
      role, // Subscriber's rolle (guest/admin)
      password, // Subscriber's adgangskode
    };

    // Kalder onAdd prop-funktionen og sender den nye subscriber og evt. billedefil
    onAdd(newSubscriber, imageFile);

    // Nulstiller formularen efter indsendelse
    setName(""); // Nulstiller navn
    setEmail(""); // Nulstiller email
    setRole("guest"); // Nulstiller rolle til standard "guest"
    setPassword(""); // Nulstiller adgangskode
    setImageFile(null); // Nulstiller billedefilen
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Navn</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="role">Rolle</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="guest">Guest</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div>
        <label htmlFor="password">Adgangskode</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="image">Billede</label>
        <input
          type="file"
          id="image"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>
      <button type="submit">Tilføj Bruger</button>
    </form>
  );
};

export default SubscriberForm;

/* 
- useState: Bruges til at håndtere inputfelternes værdier som navn, email, rolle, adgangskode og billedefil.
- handleSubmit: Håndterer indsendelsen af formularen ved at oprette et objekt med inputdata og kalde onAdd-funktionen.
- newSubscriber: Objektet, der oprettes og indeholder den nye subscribers data (uden billede).
- onAdd: En funktion, der tilføjer den nye subscriber til en liste, og modtager billedefilen som et separat argument.
- Efter indsendelse nulstilles alle felter i formularen for at forberede til en ny bruger.
*/
