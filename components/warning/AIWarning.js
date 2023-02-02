import { useEffect } from "react";
import { WarningIcon } from "components";

import config from "config";

const AIWarning = ({ onOpen }) => {
  useEffect(() => {
    onOpen();
  }, []);

  return (
    <div className="flex flex-col justify-center gap-5">
      <h3 className="flex items-center gap-6 mb-6">
        <WarningIcon />
        Warning: AI is fun but a little unpredictable
      </h3>
      <p className="text-stone-500">
        Like Vana, AI doesn&apos;t discriminate so you might see yourself in a
        different gender. Also, sometimes it dodges our moderation features, so
        you might see some skin.
      </p>
      <p className="text-stone-500">
        If anything you experience on Vana makes you feel uncomfortable, please{" "}
        <a href={`mailto:${config.vanaSupportEmail}`} className="underline">
          let us know
        </a>{" "}
        straight away.
      </p>
    </div>
  );
};

export { AIWarning };
