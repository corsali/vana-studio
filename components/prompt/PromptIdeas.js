export const ideas = [
  {
    title: "Pop Art",
    prompt: "Me digital art painting, bubblegum pink, realistic shaded lighting poster, character concept art trending on pixiv, pop art, kitsch, imaginative",
  },
  {
    title: "Magical",
    prompt: "Me fantasy painting portrait, vibrant magical landscape, rose gold, starry dimensional world, epic background, dynamic lighting, fantasy art, stylized, rich colors",
  },
  {
    title: "Angelic",
    prompt: "Me angelic closeup portrait, halo, celestial world, intricate, epic fantasy, elegant, regal, asymmetric, dynamic composition, cream and purple",
  },
];

const PromptIdeas = ({ className }) => {
  return (
    <ul className={className}>
      {ideas.map((idea, i) => (
        <>
          <h3 className="mb-4">{idea.title}</h3>
          <p>{idea.prompt}</p>
          <br />
        </>
      ))}
    </ul>
  );
};

export { PromptIdeas };

