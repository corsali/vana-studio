import styles from "./Prompt.module.css";

const Marker = ({ showArrow, children }) => {
  return (
    <span className={styles.marker}>
      {/* {showArrow && (
        <span className={styles.markerArrow}>
          <svg
            width="10"
            height="22.5"
            viewBox="0 0 12 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.7736 17L6.00006 27L0.226553 17L5.00006 17L5.00006 -2.96079e-07L7.00006 -2.08657e-07L7.00006 17L11.7736 17Z"
              fill="currentColor"
            />
          </svg>
        </span>
      )} */}

      {children}
    </span>
  );
};

export { Marker };
