import useFetchStays from "../../hooks/useFetchStays";
import DynamicHeader from "../../components/header/dynamicHeader";
import TextSection from "../../components/text-section/textSection";
import FullSectionComponent from "../../components/text-section/fullSectionOrder";

const RenderSections = ({ stays }) => {
  {
    stays.map((stay) => (
      <FullSectionComponent
        key={stay._id}
        title={stay.title} // Dynamisk titel på opholdet
        numberOfPersons={stay.numberOfPersons} // Dynamisk antal personer
        price={stay.price} // Dynamisk pris for opholdet
        backgroundImage={stay.image} // Dynamisk baggrundsbillede
        destination={`/ophold/${stay._id}`} // Dynamisk destination for knappen
      />
    ));
  }
};

const OpholdPage = () => {
  const { stays, loading, error } = useFetchStays(); // Henter stays-data fra backend

  if (loading) return <p>Loading...</p>; // Viser loading-state
  if (error) return <p>Error loading stays: {error.message}</p>; // Viser fejlbesked

  return (
    <div>
<DynamicHeader backgroundImage="image_01.jpg" title="Vores Ophold" />

      <TextSection
        title="Vi har ophold til enhver smag"
        content="Vores glampingophold er skabt til at tilbyde en kombination af eventyr og afslapning. Det er den ideelle flugt fra byens støj og stress, og det perfekte sted at genoplade batterierne i en naturskøn indstilling.
Book dit ophold i dag og giv dig selv lov til at fordybe dig i naturen og nyde luksus i det fri. Vi ser frem til at byde dig velkommen til en oplevelse fyldt med komfort, eventyr og skønhed."
      />
      <RenderSections stays={stays}></RenderSections>
      {/* Mapper igennem stays og sender data som props til FullSectionComponent */}
      {/* Når jeg sender data som props, kan jeg selv styre hvilke data jeg vil vise hvor */}
    </div>
  );
};

export default OpholdPage;

// stays.map(): Når jeg bruger stays.map(), looper jeg gennem hver enkelt stay i stays-arrayet
// og kalder FullSectionComponent én gang for hvert stay.
// Jeg sender data som title, numberOfPersons, price, backgroundImage, og destination som props til hver enkelt instans af FullSectionComponent.
