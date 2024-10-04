import { useState } from "react";
import styles from "./activityTable.module.css";

// useState hook bruges til at oprette en state variabel 'newActivity', som holder styr på en ny aktivitet, der skal tilføjes.
// 'setNewActivity' bruges til at opdatere værdien af 'newActivity'. I starten er 'newActivity' sat til et objekt med tomme felter
// for title, description, date og time.
const ActivityTable = ({ activities, onAdd, onUpdate, onDelete }) => {
  // useState hook til at holde styr på en ny aktivitet, der skal tilføjes.
  const [newActivity, setNewActivity] = useState({
    title: "", // Titel på aktiviteten, initialiseret til tom string.
    description: "", // Beskrivelse af aktiviteten, initialiseret til tom string.
    date: "", // Dato for aktiviteten, initialiseret til tom string.
    time: "", // Tidspunkt for aktiviteten, initialiseret til tom string.
  });

  // Funktion til at håndtere ændringer i inputfelterne og opdatere newActivity state.
  const handleChange = (e) => {
    // Spread operator til at kopiere det tidligere state og opdatere det aktuelle felt baseret på inputfeltets name-attribut.
    setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
  };

  // Funktion til at håndtere indsendelsen af formularen.
  const handleSubmit = (e) => {
    e.preventDefault(); // Forhindrer siden i at reloade.
    // Tilføjer den nye aktivitet ved at kalde onAdd-prop med newActivity-data.
    // id genereres med Date.now() for at sikre, at hver aktivitet har et unikt id.
    onAdd({ ...newActivity, id: Date.now() });
    // Tømmer formularen efter indsendelse ved at nulstille newActivity state.
    setNewActivity({ title: "", description: "", date: "", time: "" });
  };

  return (
    <div>
      <h2>Aktiviteter</h2>
      {/* Formular til at oprette en ny aktivitet */}
      <form className={styles.activityForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newActivity.title}
          placeholder="Titel"
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          value={newActivity.description}
          placeholder="Beskrivelse"
          onChange={handleChange}
        />

        <input
          type="text"
          name="date"
          value={newActivity.date}
          placeholder="Dato"
          onChange={handleChange}
        />

        <input
          type="text"
          name="time"
          value={newActivity.time}
          placeholder="Tid"
          onChange={handleChange}
        />

        <button type="submit">Opret Aktivitet</button>
      </form>

      {/* Tabel til at vise de eksisterende aktiviteter */}
      <table className={styles.activityTable}>
        <thead>
          <tr>
            <th>Titel</th>
            <th>Beskrivelse</th>
            <th>Dato</th>
            <th>Tid</th>
            <th>Handlinger</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapper gennem activities arrayet og viser hver aktivitet i en række */}
          {activities.map((activity) => (
            <tr key={activity.id}>
              {" "}
              <td>{activity.title}</td>
              <td>{activity.description}</td> <td>{activity.date}</td>{" "}
              <td>{activity.time}</td>
              <td>
                <button onClick={() => onUpdate(activity)}>Opdater</button>

                <button onClick={() => onDelete(activity.id)}>Slet</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;

/* handleChange: Denne funktion håndterer brugerens input i formularfelterne. Den opdaterer den relevante del af newActivity-state, 
  når brugeren indtaster data (titel, beskrivelse, dato, eller tid).
handleSubmit: Denne funktion sørger for, at når brugeren indsender formularen, så tilføjes den nye aktivitet til listen (via onAdd), 
og formularen tømmes efterfølgende.
:onAdd, onUpdate, onDelete: Disse er funktioner, som håndteres af komponentens parent (overordnede komponent).
 onAdd bruges til at tilføje en ny aktivitet, onUpdate til at opdatere en eksisterende, og onDelete til at slette en aktivitet. */
