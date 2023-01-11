import { VanaLogo, GithubIcon } from "components";
import styles from "./Nav.module.css";

const Nav = ({ children }) => {
  return (
    <nav className={styles.nav}>
      <VanaLogo />
      <div className={styles.navRight}>
        {/* for the user credits account */}
        {children}

        <a href="https://github.com/corsali/vana-portrait-demo" target="_blank">
          <GithubIcon />
        </a>
      </div>
    </nav>
  );
};

export { Nav };