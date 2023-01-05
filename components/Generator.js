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
              return { imageUrl: 'https://storage.googleapis.com/data-collective-images/tim%40vana.com/exhibits/tarot/tarot_6_1671240502.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=vana-app-user%40corsali-production.iam.gserviceaccount.com%2F20230105%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230105T232710Z&X-Goog-Expires=601&X-Goog-SignedHeaders=host&X-Goog-Signature=d7b9d3770b5dc94fe77cebd27ee30f2f1a3896f190184ffd8c88f17cd646e53fe218e9ca632267de6eb0c80b11d97fa89b6b89f739f4e5a774e3cd9300bef37ee5a7bb9a0b7cdb0cc3f92c90804d2f44808490ceb18ef119010bee0380d8f8e5f572e6ebcce404332c829e047b7e18c30b136bf30522c24913725b093be911bfc6774e7c5b8f0cf1c31883149cbb85cc11b511527139a521b426d352e7a124fc1a9470fcc03934284c8d22f54496619e43be7f55df31f2d975aab9a6f84fc92b4bee39e9f34688fbedbfdd1c91b56392c7f69e70ec61171906f69dd708c32107453a42cec183b17b5c9fe22a03d694cb78386dfbf6e7c9ab62eec48c2ccab338' };
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