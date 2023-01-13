export const ideas = [
  "Write a poem about a time you felt like you were in a dream.",
  "Write a poem about a time you felt like you were in a dream.",
  "Write a poem about a time you felt like you were in a dream.",
  "Write a poem about a time you felt like you were in a dream.",
  "Write a poem about a time you felt like you were in a dream.",
  "Write a poem about a time you felt like you were in a dream.",
  "Write a poem about a time you felt like you were in a dream.",
  "Write a poem about a time you felt like you were in a dream.",
];

const PromptIdeas = ({ className }) => {
  return (
    <ul className={className}>
      {ideas.map((idea, i) => (
        <li key={i}>{idea}</li>
      ))}
    </ul>
  );
};

export { PromptIdeas };

