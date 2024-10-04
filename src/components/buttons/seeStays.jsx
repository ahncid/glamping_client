import { useNavigate } from "react-router-dom"; // Importer useNavigate for navigation
import styles from "./seeStays.module.css";

function SeeStays({ text, destination, onClick }) {
  const navigate = useNavigate(); // Brug useNavigate til navigation

  const handleClick = () => {
    if (onClick) {
      onClick(); // Udfør den brugerdefinerede handling
    } else if (destination) {
      navigate(destination); // Naviger til destinationen, hvis ingen onClick-funktion er sendt
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.seeStays} onClick={handleClick}>
        {text} {/* Brug den tekst, der sendes som prop */}
      </button>
    </div>
  );
}

export default SeeStays;
