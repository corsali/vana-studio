import { PromptIdeas } from "components";

const IdeasMessage = () => {
  return (
    <div className="space-y-4">
      <h2 className="">Stuck for ideas?</h2>
      <p className="">Sometimes, all it takes is attention.</p>
      <PromptIdeas className="pl-3" />
      <p className="">
        Still stuck? <a href="mailto:neil@vana.com" style={{ textDecoration: "underline"}}>Ask Neil.</a>
      </p>
    </div>
  );
};

export { IdeasMessage };

