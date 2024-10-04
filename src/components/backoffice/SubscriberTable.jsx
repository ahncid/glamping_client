import styles from "./subscriberTable.module.css";

// SubscriberTable komponenten modtager subscribers og onDelete som props.
const SubscriberTable = ({ subscribers, onDelete }) => {
  return (
    <div>
      <h2>Subscribers</h2>
      {/* Tabel til at vise de eksisterende subscribers */}
      <table className={styles.subscriberTable}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Handlinger</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapper gennem subscribers arrayet og viser hver subscriber i en række */}
          {subscribers.map((subscriber) => (
            <tr key={subscriber.id}>
              <td>{subscriber.email}</td>
              <td>
                {/* Knap der kalder onDelete-prop med subscriberens id for at slette dem */}
                <button onClick={() => onDelete(subscriber.id)}>Slet</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriberTable;

/*
  SubscriberTable: Komponent der håndterer visning og sletning af subscribers.
  onDelete: Funktion der håndteres af parent-komponenten, som sletter en subscriber baseret på id. 
*/
