export const ideas = [
  "Me portrait, fine details. bubblegum pink, realistic shaded lighting poster, character concept art trending on pixiv, artgerm",
  "Me closeup portrait, mystic landscape, fantasy, rose gold, maze deep dimensional world, epic background, symmetrical, Beeple, Unreal 5, hyperrealistic, dynamic lighting, fantasy art",
  "Me angelic closeup portrait, halo, celestial world, intricate, epic fantasy, elegant, regal, asymmetric, dynamic composition, cream and purple",
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

