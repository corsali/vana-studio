import { useEffect, useState } from "react";
import { vanaPost } from "api";
import { Dialog, Spinner, IdeasMessage, Marker, useAuth } from "components";
import styles from "./Prompt.module.css";
import homeStyles from "styles/Home.module.css";

const meRegex = /\bme\b/i;

const PROMPT_LIMIT = 16;
const MINIMUM_CREDITS = 10;

// Number of "text to image" samples generated per request.
export const GENERATED_SAMPLES = 10;

const Generator = ({ authToken, userBalance, onSubmit }) => {
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
      const { success } = await vanaPost(
        `jobs/text-to-image`,
        {
          prompt: prompt.replace(meRegex, "{target_token}"),
          email: auth.user.email,
          exhibit_name: "text-to-image",
          n_samples: GENERATED_SAMPLES,
          seed: -1,
        },
        authToken
      );

      if (success) {
        onSubmit();
      }
    } catch (e) {
      let message = "An error occurred while generating the image"
      if (e.statusCode === 400) {
        message = `${e.message}. Try again with a different prompt.`
      }
      setErrorMessage(message);
    } finally {
      // Reset the form after 3 seconds
      setTimeout(() => {
        setPrompt("");
        setIsLoading(false);
      }, 3000);
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
          <Marker showArrow>2</Marker>Write a detailed prompt (including the
          word "me"):
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
            userBalance < MINIMUM_CREDITS ||
            (!validPrompt && prompt.length > PROMPT_LIMIT && isSubmitted)
          }
          className={homeStyles.primaryButton}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <>Create {GENERATED_SAMPLES} images (~7 mins)</>
          )}
        </button>
        <div className="text-gray text-3">Each attempt is 10 credits</div>
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
