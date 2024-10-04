import { useState } from "react";
import styles from "./activityTable.module.css";

const ActivityTable = ({ activities, onUpdate, onDelete }) => {
  // State variabel til at holde styr på hvilken aktivitet der er under redigering, initialiseret som null
  const [editingActivity, setEditingActivity] = useState(null);

  // State til at holde de opdaterede data for den aktivitet der redigeres, initialiseret med tomme værdier
  const [updatedData, setUpdatedData] = useState({
    title: "", // Titel på aktiviteten
    description: "", // Beskrivelse af aktiviteten
    date: "", // Dato for aktiviteten
    time: "", // Tidspunkt for aktiviteten
  });

  // State til at håndtere den valgte billedfil, initialiseret som null
  const [imageFile, setImageFile] = useState(null);

  // Helper-funktion der genererer den korrekte URL til billedet
  const getImageUrl = (image) => {
    if (!image) return null; // Hvis der ikke er et billede, returneres null

    if (image.startsWith("http")) {
      // Hvis billedet allerede er en fuld URL, returneres det som det er
      return image;
    } else {
      // Hvis billedet er en lokal fil, tilføjes serverens base URL
      return `http://localhost:3042/${image}`;
    }
  };

  // Funktion der sætter en aktivitet i redigeringstilstand
  const startEditing = (activity) => {
    // Sætter aktiviteten, der redigeres, baseret på dens _id
    setEditingActivity(activity._id);

    // Udfylder formularen med de eksisterende data for aktiviteten
    setUpdatedData({
      title: activity.title, // Titel fra den aktuelle aktivitet
      description: activity.description, // Beskrivelse fra den aktuelle aktivitet
      date: activity.date, // Dato fra den aktuelle aktivitet
      time: activity.time, // Tidspunkt fra den aktuelle aktivitet
    });

    // Nulstiller billedfilen ved start af redigering
    setImageFile(null);
  };

  // Funktion der håndterer opdateringen af en aktivitet
  const handleUpdate = () => {
    // Kalder onUpdate med den redigerede aktivitets ID, de opdaterede data og billedfilen
    onUpdate(editingActivity, updatedData, imageFile);

    // Nulstiller redigeringstilstanden efter opdatering
    setEditingActivity(null);

    // Nulstiller billedfilen efter opdatering
    setImageFile(null);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Titel</th>
          <th>Beskrivelse</th>
          <th>Dato</th>
          <th>Tid</th>
          <th>Billede</th> {/* Tilføjet kolonne til billede */}
          <th>Handlinger</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity) => (
          <tr key={activity._id}>
            {editingActivity === activity._id ? (
              <>
                <td>
                  <input
                    type="text"
                    value={updatedData.title}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, title: e.target.value })
                    }
                  />
                </td>
                <td>
                  <textarea
                    value={updatedData.description}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        description: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={updatedData.date}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, date: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={updatedData.time}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, time: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="file"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </td>
                <td>
                  <button onClick={handleUpdate}>Gem</button>
                  <button
                    onClick={() => {
                      setEditingActivity(null);
                      setImageFile(null); // Nulstil imageFile ved annullering
                    }}
                  >
                    Annuller
                  </button>
                </td>
              </>
            ) : (
              <>
                <td>{activity.title}</td>
                <td>{activity.description}</td>
                <td>{activity.date}</td>
                <td>{activity.time}</td>
                <td>
                  {activity.image ? (
                    <img
                      src={getImageUrl(activity.image)}
                      alt={activity.title}
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    "Intet billede"
                  )}
                </td>
                <td>
                  <button onClick={() => startEditing(activity)}>
                    Opdater
                  </button>
                  <button onClick={() => onDelete(activity._id)}>Slet</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ActivityTable;

/* 
- useState: Bruges til at håndtere om en aktivitet er i redigeringstilstand, de opdaterede data og billede, der kan uploades (imageFile).
- getImageUrl: Helper-funktion der genererer en korrekt URL til billedet baseret på, om det er en ekstern eller lokal fil.
- startEditing: Funktion der sætter en aktivitet i redigeringstilstand ved at udfylde formularfelterne med eksisterende data.
- handleUpdate: Funktion der opdaterer aktiviteten ved at sende den opdaterede data og eventuelt billede til onUpdate-funktionen.
- activities.map: Mapper over aktiviteterne og viser enten en redigeringsformular eller en læsetilstand, afhængig af om aktiviteten redigeres.
- Tilføjelse af billede: Både ved visning og redigering understøttes billede-filer (imageFile), og der vises et billede, hvis det findes for aktiviteten.
*/
