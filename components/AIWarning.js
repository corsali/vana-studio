import { useEffect } from "react";
import { InfoIcon } from "components";

import config from "config";

const AIWarning = ({ onOpen }) => {
  useEffect(() => {
    onOpen();
  }, []);

  return (
    <div className="flex flex-col justify-center gap-3">
      {/* <IconInfo className="w-8 h-8 text-neutral-100" /> */}
      {/* Warning... */}
      {/* <IconWarning className="w-8 h-8 text-neutral-100" /> */}
      <h3 className="font-sans font-medium flex items-center gap-1.5 text-md md:text-lg mb-1">
        <InfoIcon />
        Warning: AI is fun but a little unpredictable
      </h3>
      <p className="text-stone-500">
        Like Vana, AI doesn&apos;t discriminate so you might see yourself in a
        different gender. Also, sometimes it dodges our moderation features, so
        you might see some skin.
      </p>
      <p className="text-stone-500">
        If anything you experience on Vana makes you feel uncomfortable, please{" "}
        <a href={`mailto:${config.vanaSupportEmail}`} className="link">
          let us know
        </a>{" "}
        straight away.
      </p>
    </div>
  );
};

export { AIWarning };
