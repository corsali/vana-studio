import { Spinner } from "../icons/Spinner";
import { useState, useCallback } from "react";
import { ArrowIcon } from "../icons/ArrowIcon";
import styles from "../../styles/Home.module.css";

export const PromptEmail = ({ onGetCode, onSetLoginState, loading }) => {
  const [input, setInput] = useState("");

  const handleInput = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onGetCode(input);
    },
    [onGetCode, input]
  );

  return (
    <div>
      <h1>Login with Vana</h1>
      <section className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Email: */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className={styles.input}
            autoFocus={true}
            disabled={loading}
            value={input}
            onInput={handleInput}
          />
          <button
            type="submit"
            className={styles.unstyledButton}
            disabled={loading}
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                Get code <ArrowIcon />
              </>
            )}
          </button>
          <p className={styles.description}>
            <a onClick={() => onSetLoginState("initial")} href="#">
              Back
            </a>
          </p>
        </form>
      </section>
    </div>
  );
};
