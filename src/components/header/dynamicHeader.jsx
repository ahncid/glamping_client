import styles from "./dynamicHeader.module.css"; // Importer dit CSS-modul

const DynamicHeader = ({ backgroundImage, title }) => {
  return (
    <header
      className={styles.header}
      style={{ backgroundImage: `url(${backgroundImage})` }} // Dynamisk baggrundsbillede
    >
      <h2 className={styles.title}>{title}</h2> {/* Dynamisk overskrift */}
    </header>
  );
};

export default DynamicHeader;
