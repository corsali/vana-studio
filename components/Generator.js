import { useState } from 'react';
import config from '../config';
import { vanaPost } from '../vanaApi';

const Generator = ({ authToken, email }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const meRegex = /\b[mM][eE]\b/g

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await vanaPost(`jobs/text-to-image`, {
        prompt: prompt.replace(meRegex, '{target_token}'),
        email,
        exhibit_name: 'vana-portrait-demo-dev',
        seed: -1
      }, authToken);
    } catch (error) {
      setErrorMessage('An error occurred while generating the image');
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
          placeholder="Me eating blue spaghetti"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
        <button type="submit">Generate image</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
};

export default Generator;