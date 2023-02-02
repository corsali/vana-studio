import styles from "./VanaLogo.module.css";

export const VanaLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      style={{ width: 30, height: 30 }}
      className={styles.logo}
    >
      <rect width="64" height="64"></rect>
      <path
        d="M47.4696 15.1534L41.9054 48.1815C41.8668 48.4104 41.75 48.6181 41.5756 48.7679C41.4011 48.9177 41.1803 48.9999 40.9521 49H23.5305C23.3023 48.9999 23.0815 48.9177 22.907 48.7679C22.7326 48.6181 22.6158 48.4104 22.5772 48.1815L17.0139 15.1534C16.9901 15.0121 16.9969 14.8672 17.0338 14.7288C17.0708 14.5904 17.1369 14.4619 17.2277 14.3523C17.3185 14.2426 17.4317 14.1544 17.5595 14.0939C17.6872 14.0334 17.8264 14.0021 17.9673 14.002H23.2111C23.4389 14.002 23.6594 14.0838 23.8338 14.233C24.0082 14.3822 24.1253 14.5892 24.1645 14.8175L28.1734 38.1621C28.5605 40.3291 30.1933 41.7731 32.2674 41.7731C34.2874 41.7731 35.924 40.3291 36.3615 38.1621L40.3162 14.8175C40.355 14.5886 40.472 14.381 40.6466 14.2314C40.8213 14.0818 41.0422 13.9999 41.2705 14H46.5124C46.6538 13.9995 46.7936 14.0304 46.922 14.0908C47.0504 14.1512 47.1642 14.2395 47.2554 14.3494C47.3467 14.4594 47.4132 14.5884 47.4502 14.7273C47.4872 14.8662 47.4938 15.0116 47.4696 15.1534V15.1534Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
