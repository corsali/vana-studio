import { useEffect, useState } from "react";
import { vanaPost } from "api";
import { Dialog, Spinner, IdeasMessage, Marker, useAuth } from "components";
import styles from "./Prompt.module.css";
import homeStyles from "styles/Home.module.css";

const meRegex = /\bme\b/i;

const PROMPT_LIMIT = 16;

// Number of "text to image" samples generated per request.
// This is hard-coded to four because that's what POSTing to /images/generations produces.
// https://vana.gitbook.io/api/rest-api-v0/generating-images#text-to-image
export const GENERATED_SAMPLES = 4;

const MINIMUM_CREDITS = GENERATED_SAMPLES;

const Generator = ({ authToken, userBalance, onSuccess }) => {
  const auth = useAuth();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Determines whether the form was submitted
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [validPrompt, setValidPrompt] = useState(true);
  const [showIdeas, setShowIdeas] = useState(false);

  const handleSubmit = async (event) => {
    setIsSubmitted(true);

    event.preventDefault();
    if (!validPrompt) {
      return;
    }

    setIsLoading(true);

    try {
      const { success, message, data } = await vanaPost(
        `images/generations`,
        {
          prompt: prompt.replace(meRegex, "{target_token}"),
        },
        authToken
      );

      if (success) {
        if (data.length < GENERATED_SAMPLES) {
          throw new Error(`Received ${data.length} images, but ${GENERATED_SAMPLES} were expected.`);
        } else {
          onSuccess();
        }
      } else {
        throw new Error(message);
      }
    } catch (e) {
      let message = "An error occurred while generating the image."
      if (e.statusCode === 400) {
        message = `${e.message}. Try again with a different prompt.`
      }
      setErrorMessage(message);
      console.error(e);
    } finally {
      setPrompt("");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setValidPrompt(meRegex.test(prompt));
  }, [prompt]);

  return (
    <>
      {/* we want this block outside of the form so that the dialog button does not interfere with the form */}
      <div className={styles.generatorLabel}>
        <span>
          <Marker>1</Marker>Write a detailed prompt including the
          word "me":
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
          placeholder="Realistic oil painting of me eating green spaghetti"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className={homeStyles.largeTextarea}
        />
        <button
          type="submit"
          disabled={
            isLoading ||
            userBalance < MINIMUM_CREDITS ||
            (!validPrompt && prompt.length > PROMPT_LIMIT && isSubmitted)
          }
          className={homeStyles.primaryButton}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <>Create {GENERATED_SAMPLES} images (~20 seconds)</>
          )}
        </button>
        <div className="text-gray text-3">Each attempt is {GENERATED_SAMPLES} credits</div>
      </form>

      {typeof userBalance !== "undefined" && userBalance < MINIMUM_CREDITS && (
        <p className="text-error font-medium">
          You do not have enough credits. Get more at{" "}
          <a href="https://portrait.vana.com" target="_blank">
            portrait.vana.com
          </a>
          .
        </p>
      )}

      {/* regex error */}
      {!validPrompt && prompt.length > PROMPT_LIMIT && (
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
