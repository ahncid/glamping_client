import styles from "./headlineBox.module.css";

function HeadlineBox({ headline }) {
  return (
    <div className={styles.box}>
      <h2>{headline}</h2>
    </div>
  );
}

export default HeadlineBox;
