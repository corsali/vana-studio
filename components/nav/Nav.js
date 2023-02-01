import { VanaLogo } from "components";
import styles from "./Nav.module.css";

const Nav = ({ children }) => {
  return (
    <nav className={styles.nav}>
      <VanaLogo />
      <div className={styles.navRight}>
        {/* for the user credits account */}
        {children}
      </div>
    </nav>
  );
};

export { Nav };
