import { Logout } from "components";
import config from "config";

const NavLoggedIn = ({ userBalance }) => {
  return (
    <>
      <a
        href={config.VANA_PORTRAIT_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Your Portrait AI
      </a>
      <div className="divider"></div>
      <div>Credits: {userBalance}</div>
      <div className="divider"></div>
      <Logout />
      <div className="divider"></div>
    </>
  );
};

export { NavLoggedIn };
