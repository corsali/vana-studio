import { Logout, Credits, Dialog } from "components";
import config from "config";
import React, { useState } from "react";

const NavLoggedIn = ({ userBalance }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDialog = React.useCallback((e) => {
    e.preventDefault();

    setIsOpen(true);
  }, []);

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
      <div>
        <a onClick={handleOpenDialog}>
          Credits: {userBalance}
        </a>
      </div>
      <div className="divider"></div>
      <Logout />

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showCloseButton={false}
        closeOnOutside={true}
      >
        <Credits />
      </Dialog>
    </>
  );
};

export { NavLoggedIn };
