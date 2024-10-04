import { useState } from "react";
import styles from "./subscriberTable.module.css";

// SubscriberTable komponenten modtager subscribers, onUpdate og onDelete som props
const SubscriberTable = ({ subscribers, onUpdate, onDelete }) => {
  // State til at holde styr på hvilken subscriber der redigeres
  const [editingSubscriber, setEditingSubscriber] = useState(null); // Holder ID'et på den subscriber der er ved at blive redigeret
  // State til at holde de opdaterede data
  const [updatedData, setUpdatedData] = useState({}); // Objekt der indeholder opdateret information om den redigerede subscriber
  // State til at holde billedfilen, hvis der uploades et nyt billede
  const [imageFile, setImageFile] = useState(null); // Holder en fil-reference til det nye billede

  // Funktion til at starte redigering af en subscriber
  const startEditing = (subscriber) => {
    // Sæt den subscriber der skal redigeres baseret på subscriberens ID
    setEditingSubscriber(subscriber._id);
    // Sæt de eksisterende data som default værdier i formularen, mens password forbliver tomt
    setUpdatedData({
      name: subscriber.name, // Navn på subscriber
      email: subscriber.email, // Email på subscriber
      role: subscriber.role, // Rolle på subscriber
      password: "", // Tom, da vi ikke ønsker at vise password
    });
    // Nulstiller eventuelle tidligere valgte billeder
    setImageFile(null);
  };

  // Funktion til at håndtere opdatering af subscriber
  const handleUpdate = () => {
    const updatedSubscriber = {
      _id: editingSubscriber, // ID'et på den subscriber, der opdateres
      ...updatedData, // Spred de opdaterede data (navn, email, rolle, password)
    };
    // Kalder onUpdate-funktionen med den opdaterede subscriber og eventuel billedefil
    onUpdate(updatedSubscriber, imageFile);
    // Nulstiller editingSubscriber og billedefil efter opdatering
    setEditingSubscriber(null);
    setImageFile(null);
  };

  // Funktion til at få den korrekte URL til billedet baseret på om det er en lokal sti eller ekstern URL
  const getImageUrl = (image) => {
    if (!image) return null; // Returnerer null, hvis der ikke er et billede

    if (image.startsWith("http")) {
      return image; // Returnerer billedets URL direkte, hvis det allerede er en ekstern URL
    } else {
      // Returnerer en lokal URL baseret på backend-serverens base URL
      return `http://localhost:3042${image}`;
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Navn</th>
          <th>Email</th>
          <th>Rolle</th>
          <th>Billede</th>
          <th>Handlinger</th>
        </tr>
      </thead>
      <tbody>
        {subscribers.map((subscriber) => (
          <tr key={subscriber._id}>
            {editingSubscriber === subscriber._id ? (
              <>
                {/* Formularfelter vises hvis subscriber er under redigering */}
                <td>
                  <input
                    type="text"
                    value={updatedData.name}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, name: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="email"
                    value={updatedData.email}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, email: e.target.value })
                    }
                  />
                </td>
                <td>
                  <select
                    value={updatedData.role}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, role: e.target.value })
                    }
                  >
                    <option value="guest">Guest</option>
                    <option value="admin">Admin</option>
                  </select>
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
                      setEditingSubscriber(null);
                      setImageFile(null);
                    }}
                  >
                    Annuller
                  </button>
                </td>
              </>
            ) : (
              <>
                {/* Subscriberens oplysninger vises hvis de ikke redigeres */}
                <td>{subscriber.name}</td>
                <td>{subscriber.email}</td>
                <td>{subscriber.role}</td>
                <td>
                  {subscriber.picture ? (
                    <img
                      src={getImageUrl(subscriber.picture)}
                      alt={subscriber.name}
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    "Intet billede"
                  )}
                </td>
                <td>
                  <button onClick={() => startEditing(subscriber)}>
                    Opdater
                  </button>
                  <button onClick={() => onDelete(subscriber._id)}>Slet</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubscriberTable;

/* 
- useState: Brugt til at holde styr på, hvilken subscriber der redigeres, opdaterede data, og om der er et billede valgt til upload.
- startEditing: Starter redigeringen af en subscriber ved at sætte det aktuelle subscriber-ID og udfylde inputfelterne med eksisterende data.
- handleUpdate: Håndterer opdateringen af en subscriber og sender opdaterede data samt billedefil til onUpdate-funktionen.
- getImageUrl: Returnerer den korrekte URL til et billede baseret på om det er en ekstern URL eller en lokal fil på serveren.
- JSX: Viser enten en formular til redigering af subscriber eller visning af abonnentens oplysninger, afhængigt af om subscriber redigeres.
*/
