import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./globalNavigation.module.css";
import { Link } from "react-router-dom";
import { icons } from "../../services/icons";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Hent den aktuelle sti

  const isHomePage = location.pathname === "/"; // Tjek om vi er på forsiden

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Tilføj 'homeNavbar' klassen, hvis vi er på forsiden
    <nav className={`${styles.navbar} ${isHomePage ? styles.homeNavbar : ""}`}>
      {/* Vis logoet kun, hvis vi IKKE er på forsiden */}
      {!isHomePage && (
        <div className={styles.logo}>
          <Link to="/">
            <img src="/logo.png" alt="Glamping Logo" />
          </Link>
        </div>
      )}

      {/* Skift mellem burger-ikon og kryds-ikon */}
      <div className={styles.burgerMenu} onClick={toggleMenu}>
        {isOpen ? icons["close"] : icons["burger"]}
      </div>

      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}>
        <li>
          <NavLink to="/ophold" className={styles.active} onClick={toggleMenu}>
            Ophold
          </NavLink>
        </li>
        <li>
          <NavLink to="/kontakt" className={styles.active} onClick={toggleMenu}>
            Kontakt
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/aktiviteter"
            className={styles.active}
            onClick={toggleMenu}
          >
            Aktiviteter
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/minliste"
            className={styles.active}
            onClick={toggleMenu}
          >
            Min liste
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/beforeBackoffice"
            className={styles.active}
            onClick={toggleMenu}
          >
            Backoffice
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
