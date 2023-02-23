import { VanaLogo } from "components";
import { PageNotice } from "components/page-notice/PageNotice";
import styles from "./Nav.module.css";

const Nav = ({ children }) => {
  return (
    <section className={styles.container}>
      <PageNotice.Builder />
      <nav className={styles.nav}>
        <div className="flex items-center gap-5">
          <VanaLogo />
          <h1
            className="text-display text-3 uppercase"
            style={{ letterSpacing: "0.025em" }}
          >
            Studio
          </h1>
        </div>
        <div className={styles.navRight}>
          {/* for the user credits account */}
          {children}
        </div>
      </nav>
    </section>
  );
};

export { Nav };
