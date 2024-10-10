import styles from "./header.module.css";
import BookButton from "../buttons/BookButton";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const goto = () => {
    navigate("/kontakt"); // Naviger til den angivne destination
  };

  return (
    <header className={styles.header}>
      <div className={styles.centerContent}>
        <img src="/public/logo.png" alt="Logo" className={styles.logo} />
        <h1 className={styles.headline}>
          <span className={styles.smaller}>Gittes</span>
          <span className={styles.larger}>Glamping</span>
        </h1>
        <BookButton onClick={goto} />
      </div>
    </header>
  );
}

export default Header;
