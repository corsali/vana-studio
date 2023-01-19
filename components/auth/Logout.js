import { useCallback } from "react";
import { useAuth } from "./useAuth";
import { LogoutIcon } from "../icons/LogoutIcon";
import styles from "./Logout.module.css";

const Logout = () => {
  const auth = useAuth();
  const handleLogout = useCallback(() => {
    window.localStorage.removeItem("authToken");
    auth.setToken();
  }, []);

  return (
    <div className={`${styles.logoutContainer} text-gray`} onClick={handleLogout} title="Logout">
      <span>Sign out</span>
      <span className={styles.logoutBtn}>
        <LogoutIcon />
      </span>
    </div>
  );
};

export { Logout };
