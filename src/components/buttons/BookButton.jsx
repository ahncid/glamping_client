import { useNavigate } from "react-router-dom";
import styles from "./bookButton.module.css";

function BookButton({
  customStyles = {},
  destination = "",
  buttonText = "BOOK NU",
  onClick = null,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Kald brugerdefineret funktion
    } else if (destination) {
      navigate(destination); // Naviger til den angivne destination
    }
  };

  return (
    <button
      className={styles.bookButton}
      style={customStyles}
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
}

export default BookButton;
