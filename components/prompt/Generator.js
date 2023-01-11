import { useEffect, useState } from 'react';
import { vanaPost } from 'vanaApi';
import { Dialog } from "components";
import styles from "./Prompt.module.css";
import homeStyles from "styles/Home.module.css";

const meRegex = /\bme\b/i;

const Generator = ({ authToken, email }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [validPrompt, setValidPrompt] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await vanaPost(`jobs/text-to-image`, {
        prompt: prompt.replace(meRegex, '{target_token}'),
        email,
        exhibit_name: 'text-to-image',
        n_samples: 8,
        seed: -1
      }, authToken);
    } catch (error) {
      setErrorMessage('An error occurred while generating the image');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (prompt.length > 20) {
      setValidPrompt(meRegex.test(prompt))
    }
  }, [prompt])

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.generator}>
        <label htmlFor="prompt-input" className={styles.generatorLabel}>
          <span>Write a detailed prompt to create with:</span>
          <span className="text-gray">Need some ideas?</span>
        </label>
        <textarea
          id="prompt-input"
          type="text"
          placeholder="Me eating blue spaghetti"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className={homeStyles.largeTextarea}
        />
        <button
          type="submit"
          disabled={!validPrompt}
          className={homeStyles.primaryButton}
        >
          Create image
        </button>
      </form>

      {/* regex error */}
      {!validPrompt && (
        <p className="text-error font-medium">
          You must include "me" in your prompt. Please try again.
        </p>
      )}

      {/* submission error */}
      {errorMessage && (
        <p className="text-error font-medium">Error: {errorMessage}</p>
      )}

      {/* awaiting VanaPost */}
      <Dialog isOpen={isLoading}>
        <p>Loading...</p>
      </Dialog>
    </>
  );
};

export { Generator };