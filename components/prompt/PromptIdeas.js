export const ideas = [
  "Me portrait, fine details. bubblegum pink, realistic shaded lighting poster, character concept art trending on pixiv by ilya kuvshinov, katsuhiro otomo, magali villeneuve, artgerm, jeremy lipkin, rob rey",
  "Me closeup portrait, mystic landscape, fantasy, rose gold, maze deep dimensional world, epic background, symmetrical, Greg Rutkowski, Charlie Bowater, Beeple, Unreal 5, hyperrealistic, dynamic lighting, fantasy art",
  "Me angelic closeup portrait, halo, celestial world by greg rutkowski, intricate, epic fantasy, elegant, regal, by stanley artgerm lau, greg rutkowski, norman rockwell, asymmetric, dynamic composition, cream and purple",
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

