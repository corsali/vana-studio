export const ideas = [
  "A drawing of me as a mermaid, swimming in a sea of flowers",
  "A painting of me as a king, sitting on a throne surrounded by courtiers",
  "A cartoon of me as a detective, solving a mystery",
  "A sketch of me as an artist, painting in a studio",
  "A computer-generated image of me as a cyborg, in a futuristic city",
  "A photograph of me as a model, on a runway",
  "A sketch of me as an astronaut, floating in space",
  "A cartoon of me as a rockstar, performing on stage",
  "A painting of me as a pirate, sailing on a ship",
  "A computer-generated image of me as a scientist, conducting experiments in a lab",
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
