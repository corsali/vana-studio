import { useEffect, useState } from "react";
import { vanaPost } from "api";
import { Dialog, Spinner, IdeasMessage, Marker } from "components";
import styles from "./Prompt.module.css";
import homeStyles from "styles/Home.module.css";

const meRegex = /\bme\b/i;

// Number of "text to image" samples generated per request.
const GENERATED_SAMPLES = 8;

const Generator = ({ authToken, email, onSubmit }) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [validPrompt, setValidPrompt] = useState(true);
  const [showIdeas, setShowIdeas] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setValidPrompt(meRegex.test(prompt));

    if (!validPrompt) {
      setIsLoading(false);
      return;
    }

    try {
      await vanaPost(
        `jobs/text-to-image`,
        {
          prompt: prompt.replace(meRegex, "{target_token}"),
          email,
          exhibit_name: "text-to-image",
          n_samples: GENERATED_SAMPLES,
          seed: -1,
        },
        authToken
      );

      onSubmit();
    } catch {
      setErrorMessage("An error occurred while generating the image");
    } finally {
      // Reset the form after 3 seconds
      setTimeout(() => {
        setPrompt("");
        setIsLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (prompt.length > 20) {
      setValidPrompt(meRegex.test(prompt));
    }
  }, [prompt]);

  return (
    <>
      {/* we want this block outside of the form so that the dialog button does not interfere with the form */}
      <div className={styles.generatorLabel}>
        <span>
          <Marker showArrow>2</Marker>Write a detailed prompt:
        </span>
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
          {isLoading 
            ? <Spinner /> 
            : <>Create {GENERATED_SAMPLES} images (~2 mins)</>
          }
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

      {/* ideas dialog */}
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
