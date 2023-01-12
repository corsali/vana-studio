import { PromptIdeas } from "components";

const PromptAwaitingMessage = () => {
  return (
    <div className="space-y-4">
      <h2 className="">Takes about a minute</h2>
      <p>While you're waiting, here's some other ideas:</p>
      <PromptIdeas className="pl-3" />
      <p>
        Got a problem? <a href="mailto:neil@vana.com" style={{ textDecoration: "underline"}}>Ask Neil.</a>{" "}
      </p>
    </div>
  );
};

export { PromptAwaitingMessage };

