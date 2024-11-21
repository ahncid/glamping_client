import useFetchStays from "../../hooks/useFetchStays";
import DynamicHeader from "../../components/header/dynamicHeader";
import TextSection from "../../components/text-section/textSection";
import FullSectionComponent from "../../components/text-section/fullSectionOrder";

const RenderSections = ({ stays }) => {
  return (
    <>
      {stays.map((stay) => (
        <FullSectionComponent
          key={stay._id}
          title={stay.title}
          numberOfPersons={stay.numberOfPersons}
          price={stay.price}
          backgroundImage={stay.image} 
          destination={`/ophold/${stay._id}`}
        />
      ))}
    </>
  );
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
      <RenderSections stays={stays} />
    </div>
  );
};

export default OpholdPage;
