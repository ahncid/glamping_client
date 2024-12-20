import useFetchActivities from "../../hooks/useFetchActivities";
import ActivitySection from "../../components/text-section/activitySection";
import DynamicHeader from "../../components/header/dynamicHeader";
import TextSection from "../../components/text-section/textSection";
import { useLikedActivities } from "../../context/likeContext";
import { serverPath } from "../../services/settings";
import { getImageUrl } from "../../../utils/getImageHelper";

const ActivityPage = () => {
  // Destrukturering af state-værdier fra custom hook "useFetchActivities"
  // activities: Array af aktiviteter hentet fra API
  // loading: Boolean der indikerer om data stadig hentes
  // error: Objekt der indeholder eventuelle fejl under datahentning
  const { activities, loading, error } = useFetchActivities();

  // Destrukturering af state-værdier fra useLikedActivities context
  // likedActivityIds: Array af IDs for de aktiviteter, som brugeren har liket
  // toggleLike: Funktion der tilføjer eller fjerner et like fra en aktivitet
  const { likedActivityIds, toggleLike } = useLikedActivities();

  // Conditional rendering: Viser en loading-besked, hvis data stadig hentes - Sand/falsk?
  if (loading) return <p>Loading...</p>;

  // Conditional rendering: Viser fejlbesked, hvis der opstod en fejl under datahentning - Sand/falsk?
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {/* DynamicHeader-komponenten bruges til at vise et dynamisk header-billede og en titel for aktivitetsiden */}
      <DynamicHeader backgroundImage="image_04.jpg" title="Aktiviteter" />

      {/* TextSection-komponenten viser en beskrivelse af de aktiviteter, der tilbydes */}
      <TextSection
        title="Ingen skal kede sig hos Gitte"
        content="Glamping er mere end blot en indkvartering - det er en mulighed for at fordybe dig i naturen og skabe minder, der varer livet ud. Uanset om du foretrækker en eventyrlig kanotur, en oplysende naturvandring, hjertevarm samvær omkring bålet, smagfulde oplevelser som vinsmagning eller morgenyoga, der giver dig indre ro og balance i naturens skød - vil vi hos Gittes Glamping imødekomme dine ønsker."
      />

      {/* Mapper gennem activities arrayet og renderer en ActivitySection for hver aktivitet */}
      {activities.map((activity) => (
        <ActivitySection
          key={activity._id}
          dynamicText={activity.title}
          backgroundImage={getImageUrl(activity.image)}
          leftText1={activity.date}
          leftText2={activity.time}
          expandedText={activity.description}
          isLiked={likedActivityIds.includes(activity._id)}
          onToggleLike={() => toggleLike(activity)}
        />
      ))}
    </div>
  );
};

export default ActivityPage;

/*
1. Destrukturering: Udpakning af activities, loading, og error fra useFetchActivities, samt likedActivityIds og toggleLike fra useLikedActivities context.
2. Ternary operator: Bruges i getImageUrl funktionen til at kontrollere, om billed-URL'en allerede er fuldstændig (starter med "http"), og ellers tilføjes serverens base URL.
3. Conditional rendering: Viser loading-besked eller fejlbesked, hvis der er behov for det, baseret på værdierne af loading og error.
4. Array.map(): Bruges til at iterere gennem activities arrayet og returnere en komponent for hver aktivitet.
5. Props: ActivitySection modtager props som title, image, date, time, description, og isLiked, hvilket gør komponenten dynamisk og interaktiv.
6. Boolean: isLiked er en boolean, der bestemmes ved at bruge includes til at tjekke, om activity._id findes i likedActivityIds arrayet.
*/
