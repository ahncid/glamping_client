import { useState } from "react";
import styles from "./activityForm.module.css";

const AddActivityForm = ({ onAdd }) => {
  // Komponent der modtager onAdd som prop for at tilføje en ny aktivitet
  const [title, setTitle] = useState(""); // State til at holde værdien for aktiviteten 'title'
  const [description, setDescription] = useState(""); // State til at holde værdien for aktiviteten 'description'
  const [date, setDate] = useState(""); // State til at holde værdien for aktiviteten 'date'
  const [time, setTime] = useState(""); // State til at holde værdien for aktiviteten 'time'
  const [image, setImage] = useState(null); // State til at håndtere billedfilen der uploades, initialiseret som null

  const handleSubmit = (e) => {
    // Funktion til at håndtere indsendelsen af formularen
    e.preventDefault(); // Forhindrer standardformularens opførsel som ville reloade siden

    // Opretter et objekt med værdierne fra inputfelterne
    const newActivity = {
      title, // Titel på den nye aktivitet
      description, // Beskrivelse af den nye aktivitet
      date, // Dato for aktiviteten
      time, // Tidspunkt for aktiviteten
    };

    // Kalder onAdd-funktionen med det nye aktivitetsobjekt og billedfilen
    onAdd(newActivity, image);

    // Nulstil inputfelterne efter indsendelse
    setTitle(""); // Nulstiller 'title' inputfeltet
    setDescription(""); // Nulstiller 'description' inputfeltet
    setDate(""); // Nulstiller 'date' inputfeltet
    setTime(""); // Nulstiller 'time' inputfeltet
    setImage(null); // Nulstiller billedfilen
  };

  // Nulstiller så formularen er klar til at oprette en ny aktivitet.

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Titel</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Beskrivelse</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Dato</label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="time">Tid</label>
        <input
          type="text"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="image">Billede</label>
        <input
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files[0])} // Gem den valgte fil
        />
      </div>
      <button type="submit">Tilføj Aktivitet</button>
    </form>
  );
};

export default AddActivityForm;

/* 
- useState: Bruges til at holde styr på de forskellige inputfelters værdier (titel, beskrivelse, dato, tid) samt billedfilen, der kan uploades.
- handleSubmit: Funktion der håndterer indsendelsen af formularen. Den forhindrer standard formularindsendelse, opretter et nyt aktivitetsobjekt, og kalder onAdd-funktionen med det nye objekt og billedefilen.
- newActivity: Objektet der bliver oprettet og indeholder værdierne for titel, beskrivelse, dato og tid, men ikke billedet (som håndteres separat).
- onAdd: Funktion modtaget som prop, der håndterer tilføjelsen af den nye aktivitet, inklusive billede.
- Efter indsendelse: Formularen bliver nulstillet ved at tømme felterne for titel, beskrivelse, dato, tid og nulstille billedfilen.
*/
