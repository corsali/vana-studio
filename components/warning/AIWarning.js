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
        Ok, let’s get real. Vana Studio is still in Beta mode, so things might
        get a little wacky. But hey, that’s part of the fun, right?
      </p>
      <p className="text-stone-500">
        Just remember, once you turn your imagination into pixels, there’s no
        turning back. So choose your words wisely! And if you happen to create
        something you regret, hit up our support squad and they’ll do their best
        to make it disappear (no guarantees). Now go forth and unleash your
        inner artist!
      </p>
    </div>
  );
};

export { AIWarning };
