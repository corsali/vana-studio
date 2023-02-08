export const ideas = [
  "Me digital art painting, bubblegum pink, realistic shaded lighting poster, character concept art trending on pixiv, pop art, kitsch, imaginative",
  "Me fantasy painting portrait, vibrant magical landscape, rose gold, starry dimensional world, epic background, dynamic lighting, fantasy art, stylized, rich colors",
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

