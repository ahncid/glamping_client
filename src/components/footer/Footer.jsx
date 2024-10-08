import { icons } from "../../services/icons";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.iconContainer}>
        <a
          className={styles.icon}
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {icons["facebook"]}
        </a>
        <a
          className={styles.icon}
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {icons["instagram"]}
        </a>
      </div>
      <div className={styles.logoContainer}>
        <img src="/public/logo.png" alt="Logo" className={styles.logo} />
        <h2>Gittes Glamping</h2>
      </div>
    </footer>
  );
};

export default Footer;
