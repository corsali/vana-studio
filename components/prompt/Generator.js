import { useEffect, useState } from 'react';
import { vanaPost } from 'vanaApi';
import { Dialog, PromptAwaitingMessage, IdeasMessage } from "components";
import styles from "./Prompt.module.css";
import homeStyles from "styles/Home.module.css";

const meRegex = /\bme\b/i;

const Generator = ({ authToken, email }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [validPrompt, setValidPrompt] = useState(true);
  const [showIdeas, setShowIdeas] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // isLoading triggers the awaiting dialog. We want to delay it a little so that if there's an error, the dialog doesn't flash up
    setTimeout(() => { setIsLoading(true) }, 1000);

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
    if (isLoading) {
      setValidPrompt(meRegex.test(prompt))
    }
  }, [prompt])

  return (
    <>
      {/* we want this block outside of the form so that the dialog button does not interfere with the form */}
      <div className={styles.generatorLabel}>
        <span>Write a detailed prompt:</span>
        <span className="text-gray">
          <button
            onClick={() => setShowIdeas(true)}
            className={homeStyles.unstyledButton}
          >
            Need ideas?
          </button>
        </span>
      </div>

      {/* prompt form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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
      {!errorMessage && (
        <Dialog isOpen={isLoading}>
          <PromptAwaitingMessage />
        </Dialog>
      )}

      {/* ideas */}
      <Dialog 
        isOpen={showIdeas} 
        onClose={() => setShowIdeas(false)} 
        showCloseButton
      >
        <IdeasMessage />
      </Dialog>
    </>
  );
};

export { Generator };