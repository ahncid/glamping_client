import Header from "../../components/header/header.jsx";
import TextSection from "../../components/text-section/textSection.jsx";
import SeeStays from "../../components/buttons/seeStays.jsx";
import styles from "./homePage.module.css";
import HeadlineBox from "../../components/text-section/headlineBox.jsx";
import Reviews from "../../components/reviews/Reviews.jsx";

const HomePage = () => {
  return (
    <div>
      <Header />
      <TextSection
        title="Kom og prøv glamping hos Gitte!"
        content="Vi er stolte af at byde dig velkommen til Gitte’s Glamping, hvor hjertevarme og omsorg møder naturens skønhed og eventyr. Vores dedikerede team, anført af Gitte selv, er her for at skabe den perfekte ramme om din luksuriøse udendørsoplevelse. Vi stræber efter at skabe minder og fordybelse, uanset om du besøger os som par, familie eller soloeventyrer. Vi tilbyder en bred vifte af aktiviteter og arrangementer, der passer til alle aldre og interesser. Udforsk naturen, slap af ved bålet, del historier med nye venner, eller find indre ro med vores wellnessaktiviteter."
      />
      <div className={styles.imageContainer}>
        {" "}
        <img
         src={`${import.meta.env.BASE_URL}gitte.jpg`}
          alt="Gitte"
          className={styles.imageOfGitte}
        />
      </div>
      <SeeStays text="SE VORES OPHOLD" destination="/ophold" />
      <HeadlineBox headline="Vores gæster udtaler" />
      <Reviews />
    </div>
  );
};

export default HomePage;
