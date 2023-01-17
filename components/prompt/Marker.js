import styles from "./Prompt.module.css";

const Marker = ({ showArrow, children }) => {
  return (
    <span className={styles.marker}>
      {children}
    </span>
  );
};

export { Marker };
