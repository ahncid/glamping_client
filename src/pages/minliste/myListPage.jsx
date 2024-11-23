import { useLikedActivities } from "../../context/likeContext";
import ActivitySection from "../../components/text-section/activitySection";
import DynamicHeader from "../../components/header/dynamicHeader";
import styles from "./myListPage.module.css";
import useFetchActivities from "../../hooks/useFetchActivities";
import { getImageUrl } from "../../../utils/getImageHelper";

const MinListePage = () => {
  // Destrukturering af state-værdier fra useLikedActivities-context
  // likedActivityIds: Array der indeholder IDs på de aktiviteter, som brugeren har liket
  // toggleLike: Funktion til at tilføje eller fjerne et like fra en aktivitet
  const { likedActivityIds, toggleLike } = useLikedActivities();

  // Destrukturering af state-værdier fra custom hook "useFetchActivities"
  // activities: Array af aktiviteter hentet fra API
  // loading: Boolean der indikerer, om data stadig hentes
  // error: Objekt der indeholder eventuelle fejl under datahentning
  const { activities, loading, error } = useFetchActivities();

  // Conditional rendering: Viser loading-besked, hvis data stadig hentes
  if (loading) return <p>Loading activities...</p>;

  // Conditional rendering: Viser fejlbesked, hvis der opstod en fejl under datahentning
  if (error) return <p>Error: {error.message}</p>;

  // Filtrer aktiviteterne og returner kun de aktiviteter, der er blevet liket af brugeren
  // Array.filter() bruges til at filtrere aktiviteterne baseret på om deres ID findes i likedActivityIds-arrayet
  const likedActivities = activities.filter((activity) =>
    likedActivityIds.includes(activity._id)
  );

  return (
    <div>
      {/* DynamicHeader-komponenten bruges til at vise et dynamisk header-billede og titel */}
      <DynamicHeader backgroundImage="image_05.jpg" title="Min liste" />

      {/* Viser antal likede aktiviteter */}
      <div className={styles.textContainerList}>
        <h6>Antal aktiviteter på listen:</h6> <p>{likedActivities.length}</p>
      </div>

      {/* Conditional rendering: Hvis der er likede aktiviteter, vises de, ellers vises en fallback-besked */}
      {likedActivities.length > 0 ? (
        <>
          {/* Mapper gennem likedActivities arrayet og renderer en ActivitySection for hver aktivitet */}
          {likedActivities.map((activity) => (
            <ActivitySection
              key={activity._id}
              dynamicText={activity.title}
              backgroundImage={getImageUrl(activity.image)} // Brug den korrekte funktion
              leftText1={activity.date}
              leftText2={activity.time}
              expandedText={activity.description}
              isLiked={true}
              onToggleLike={() => toggleLike(activity)}
            />
          ))}
        </>
      ) : (
        // Fallback-besked hvis der ikke er nogen likede aktiviteter
        <p>Ingen likede aktiviteter fundet.</p>
      )}
    </div>
  );
};

export default MinListePage;

/* 
1. Destrukturering: Bruges til at udpakke likedActivityIds og toggleLike fra useLikedActivities-context, og activities, loading, og error fra useFetchActivities hooket.
2. Conditional rendering: Koden viser enten en loading-besked, en fejlbesked eller aktiviteter baseret på dataens tilgængelighed.
3. Array.filter(): Bruges til at filtrere aktiviteterne og kun returnere de aktiviteter, der er blevet liket af brugeren.
4. Props: ActivitySection modtager flere props, herunder title, image, date, time, og en onToggleLike-funktion, som gør komponenten dynamisk og interaktiv.
5. Fallback rendering: Viser en besked om, at ingen aktiviteter er liket, hvis likedActivities-arrayet er tomt.
*/
