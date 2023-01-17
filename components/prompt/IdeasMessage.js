import { PromptIdeas } from "components";

const IdeasMessage = () => {
  return (
    <div className="space-y-4">
      <h2>Need ideas?</h2>
      <p>Here are a few:</p>
      <PromptIdeas className="pl-3" />
    </div>
  );
};

export { IdeasMessage };

