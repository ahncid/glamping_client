import styles from "./dynamicHeader.module.css";

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
