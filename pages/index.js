import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import styles from "styles/Home.module.css";
import Generator from "components/Generator";
import { PromptCode } from "components/auth/forms/PromptCode";
import { PromptEmail } from "components/auth/forms/PromptEmail";
import { VanaLogo } from "components/icons/VanaLogo";
import { GithubIcon } from "components/icons/GithubIcon";
import { vanaGet, vanaPost } from "vanaApi";

/**
 * The entry point for the demo app
 * It contains the state management for the app flow.
 */
export default function Home() {
  const [email, setEmail] = useState();
  const [user, setUser] = useState();
  const [exhibits, setExhibits] = useState([]);
  const [loginState, setLoginState] = useState("initial"); // initial, promptEmail, promptCode, loggedIn
  const [errorMessage, setErrorMessage] = useState();
  const [authToken, setAuthToken] = useState();
  const [loading, setLoading] = useState(false);

  const createLogin = useCallback(async (email) => {
    setEmail(email);
    setLoading(true);

    try {
      await vanaPost("auth/create-login", {
        email,
      });
      setLoginState("promptCode");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const logIn = useCallback(
    async (code) => {
      try {
        setLoading(true);
        const { token } = await vanaPost("auth/login", {
          email,
          code,
        });

        setAuthToken(token);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    },
    [email]
  );

  const refreshUser = useCallback(async () => {
    const [exhibitPromise, portraitPromise] = [
      vanaGet("account/exhibits", {}, authToken),
      vanaGet("account/exhibits/text-to-image", {}, authToken),
    ];

    const [exhibitsResponse, portraitResponse] = await Promise.all([
      exhibitPromise,
      portraitPromise,
    ]);

    setExhibits(exhibitsResponse.exhibits);
    setUser({ images: portraitResponse.urls });
  }, []);

  useEffect(() => {
    setLoginState(authToken ? "loggedIn" : "initial");
  }, [authToken]);

  useEffect(() => {
    const refreshUserWithTimeout = async () => {
      // if the auth token was invalidated
      if (!authToken) {
        clearTimeout(refreshUserWithTimeout);

        return;
      }

      await refreshUser();

      // Refresh the user auth token every minute to prevent it's expiring.
      setTimeout(refreshUserWithTimeout, 60000);
    };

    refreshUserWithTimeout();

    return () => clearTimeout(refreshUserWithTimeout);
  }, [authToken, refreshUser]);

  return (
    <>
      <Head>
        <title>Vana Boilerplate</title>
        <meta name="description" content="Generate portraits with Vana" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <VanaLogo />
        <a href="https://github.com/corsali/vana-portrait-demo" target="_blank">
          <GithubIcon />
        </a>
      </header>
      <main className={styles.main}>
        <div className={styles.center}>
          {loginState === "initial" && (
            <div>
              <h1>Vana Boilerplate</h1>
              <section className={styles.content}>
                <button
                  onClick={() => setLoginState("promptEmail")}
                  className={styles.primaryButton}
                >
                  Login
                </button>
                <p className={styles.description}>
                  New to Vana?{" "}
                  <a target="_blank" href="https://portrait.vana.com/create">
                    Create your Portrait
                  </a>
                </p>
              </section>
            </div>
          )}

          {loginState === "promptEmail" && (
            <PromptEmail
              onGetCode={createLogin}
              onSetLoginState={setLoginState}
              loading={loading}
            />
          )}

          {loginState === "promptCode" && (
            <PromptCode
              onLogin={logIn}
              loading={loading}
              onSetLoginState={setLoginState}
            />
          )}

          {loginState === "loggedIn" && user && (
            <LoggedIn
              user={user}
              email={email}
              hasExhibits={!!exhibits.length}
              authToken={authToken}
            />
          )}

          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </div>
      </main>
    </>
  );
}

const LoggedIn = ({ user, email, authToken, hasExhibits }) => {
  const handleCreate = useCallback(() => {
    window.open("https://portrait.vana.com/create", "_blank").focus();
  }, []);

  if (!hasExhibits) {
    return (
      <div>
        <h1>Create your Vana Portrait</h1>
        <section className={styles.content}>
          <p>It seems we don't have a model for you yet.</p>
          <button type="submit" onClick={handleCreate}>
            Create Portrait on Vana
          </button>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Generator authToken={authToken} email={email} />
      {user.images.map((image, i) => (
        <img src={image} key={i} />
      ))}
    </div>
  );
};
