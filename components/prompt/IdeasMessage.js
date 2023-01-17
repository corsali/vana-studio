import { PromptIdeas } from "components";

const IdeasMessage = () => {
  return (
    <div className="space-y-4">
      <h2>Stuck for ideas?</h2>
      <p>Here's a few:</p>
      <PromptIdeas className="pl-3" />
    </div>
  );
};

export { IdeasMessage };

