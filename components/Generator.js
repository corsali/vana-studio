import { useState } from 'react';
import config from '../config';

const Generator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // const response = await fetch(
      //   `${config.VANA_API_URL}/generate-image?prompt=${encodeURIComponent(prompt)}`
      // );
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            status: 200,
            json: () => {
              return { imageUrl: 'https://portrait.vana.com/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F87172%2F1670918662-2053232767_go_soo_jung_closeup_portrait-beautiful_flat_illustrated_water_smoke_portrait-realistic_abstract_et.png%3Fauto%3Dformat%26q%3D40%26w%3D1200&w=640&q=75' };
            }
          });
        }, 1000); // simulate 1 second of latency
      });

      if (response.status !== 200) {
        throw new Error("An error occurred while generating the image");
      }
      const data = await response.json();
      if (response.ok) {
        setImageUrl(data.imageUrl);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt-input">Prompt:</label>
        <input
          id="prompt-input"
          type="text"
          placeholder="{target_token} eating blue spaghetti"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
        <button type="submit">Generate image</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
      {imageUrl && <img src={imageUrl} alt={prompt} />}
    </div>
  );
};

export default Generator;