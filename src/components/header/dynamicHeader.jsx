import styles from './dynamicHeader.module.css';

const DynamicHeader = ({ backgroundImage, title }) => {
  return (
    <header
      className={styles.header}
      style={{
        backgroundImage: `url('${import.meta.env.BASE_URL}${backgroundImage}')`,
      }}
    >
      <h2 className={styles.title}>{title}</h2>
    </header>
  );
};

export default DynamicHeader;
