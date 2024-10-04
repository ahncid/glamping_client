import useBackofficeActivities from "./hooks/useBackofficeActivities";
import useBackofficeSubscribers from "./hooks/useBackofficeSubscribers";
import ActivityTable from "./components/activityTable";
import SubscriberTable from "./components/subscriberTable";
import AddActivityForm from "./components/ActivityForm";
import { useNavigate } from "react-router-dom";
import SubscriberForm from "./components/SubscriberForm";
import styles from "./backOfficePage.module.css";

// BackofficePage komponenten håndterer aktiviteter og users
const BackofficePage = () => {
  const navigate = useNavigate();
  // Destrukturering af returnerede værdier fra useBackofficeActivities hook
  // activities er et array af aktivitetsobjekter
  // loadingActivities og errorActivities er booleans for at indikere loading/error status
  // addActivity, updateActivity, deleteActivity er funktioner til at tilføje, opdatere og slette aktiviteter
  const {
    activities, // Array af aktiviteter hentet fra serveren
    loading: loadingActivities, // Boolean der indikerer om aktiviteterne er ved at blive hentet
    error: errorActivities, // Objekt der indeholder en eventuel fejl ved hentning af aktiviteter
    addActivity, // Funktion til at tilføje en ny aktivitet
    updateActivity, // Funktion til at opdatere en eksisterende aktivitet
    deleteActivity, // Funktion til at slette en aktivitet
  } = useBackofficeActivities();

  // Destrukturering af returnerede værdier fra useBackofficeSubscribers hook
  // subscribers er et array af abonnementsobjekter
  // loadingSubscribers og errorSubscribers er booleans for at indikere loading/error status
  // addSubscriber, updateSubscriber, deleteSubscriber er funktioner til at tilføje, opdatere og slette users
  const {
    subscribers, // Array af users hentet fra serveren
    loading: loadingSubscribers, // Boolean der indikerer om users er ved at blive hentet
    error: errorSubscribers, // Objekt der indeholder en eventuel fejl ved hentning af users
    addSubscriber, // Funktion til at tilføje en ny user
    updateSubscriber, // Funktion til at opdatere en eksisterende user
    deleteSubscriber, // Funktion til at slette en user
  } = useBackofficeSubscribers();

  // Kontrolstruktur for loading og fejltilstande.
  // Ternary operator returnerer enten loading-tekst eller fejlmeddelelse baseret på tilstandene
  if (loadingActivities || loadingSubscribers) return <p>Loading...</p>;
  if (errorActivities || errorSubscribers)
    return (
      // Viser fejlmeddelelse baseret på enten activities- eller subscribers-fejlen (hvis en af dem eksisterer)
      <p>Error: {errorActivities?.message || errorSubscribers?.message}</p>
    );

  const handleClick = (path) => {
    navigate(path); // Brug navigate-funktionen til at omdirigere
  };

  return (
    <div className={styles.backofficeContainer}>
      <h2>Backoffice</h2>

      <button
        onClick={() => handleClick("/backofficeContact")}
        className={styles.linkButton}
      >
        Gå til Backoffice Contact
      </button>
      {/* Add Activity Form */}
      <AddActivityForm onAdd={addActivity} />
      {/* Activity Table */}
      <ActivityTable
        activities={activities}
        onUpdate={updateActivity}
        onDelete={deleteActivity}
      />
      {/* Add Subscriber Form */}
      <SubscriberForm onAdd={addSubscriber} />
      {/* Subscriber Table */}
      <SubscriberTable
        subscribers={subscribers}
        onUpdate={updateSubscriber}
        onDelete={deleteSubscriber}
      />
    </div>
  );
};

export default BackofficePage;

/* 
- useBackofficeActivities: Custom hook der henter aktiviteter og håndterer CRUD-operationer (Create, Read, Update, Delete) for aktiviteter.
- useBackofficeSubscribers: Custom hook der henter abonnenter og håndterer CRUD-operationer for users.
- activities, subscribers: Arrays der indeholder henholdsvis aktivitets- og userobjekter.
- loadingActivities, loadingSubscribers: Booleans der angiver om data fra serveren stadig hentes.
- errorActivities, errorSubscribers: Objekter der indeholder fejlmeddelelser, hvis datahentning mislykkes.
- Ternary operators: Brugt til at vise enten loading-tekst eller fejlbeskeder, afhængigt af loading- eller fejltilstandene.
*/
