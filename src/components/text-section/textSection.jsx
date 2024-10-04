import styles from "./textSection.module.css";

function TextSection({ title, content }) {
  return (
    <section className={styles.textSection}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.content}>{content}</p>
    </section>
  );
}

export default TextSection;
