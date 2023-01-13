import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import styles from "styles/Home.module.css";
import {
  PromptEmail,
  PromptCode,
  PromptLogin,
  Prompt,
  Generator,
  Nav,
  getTextToImageUserExhibits,
  getRandomUserExhibits,
  getUserBalance,
} from "components";
import { vanaPost } from "vanaApi";

// Number of "text to images" generated per request.
const imagesPerRequest = 8;

/**
 * The entry point for the demo app
 * It contains the state management for the app flow.
 */
export default function Home() {
  const [email, setEmail] = useState();
  const [userBalance, setUserBalance] = useState(0);

  const [textToImageExhibitImages, setTextToImageExhibitImages] = useState([]);
  const [randomExhibitImages, setRandomExhibitImages] = useState([]);

  // loginState is one of: initial, emailForm, pinCodeForm, loggedIn
  const [loginState, setLoginState] = useState("initial");
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const [expectedGeneratorCount, setExpectedGeneratorCount] = useState(0);

  // -- authToken setup --
  let lsAuthToken;
  if (typeof window !== "undefined") {
    lsAuthToken = window.localStorage.getItem("authToken");
  }

  const [authToken, setAuthToken] = useState(lsAuthToken);

  if (typeof window !== "undefined") {
    useEffect(() => {
      // Prevent setting 'null' or 'undefined' values to the localstorage
      window.localStorage.setItem("authToken", authToken ?? "");
    }, [authToken]);
    // todo: handle token expiration
  }
  // -- end of authToken setup --

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

  const updateGeneratorCount = useCallback((count) => {
    window.localStorage.setItem("expectedGeneratorCount", count);

    setExpectedGeneratorCount(count);
  }, []);

  const handleGenerationSubmit = useCallback(() => {
    let expectedGeneratorCount =
      parseInt(window.localStorage.getItem("expectedGeneratorCount")) || 0;

    if (expectedGeneratorCount < textToImageExhibitImages.length) {
      expectedGeneratorCount = textToImageExhibitImages.length;
    }

    updateGeneratorCount(expectedGeneratorCount + imagesPerRequest);
  }, [textToImageExhibitImages]);

  // Get random user exhibit images
  const populateRandomUserExhibits = useCallback(async (token) => {
    const images = await getRandomUserExhibits(token, 3);

    setRandomExhibitImages(images);
  }, []);

  // Get Text to Image exhibit images
  const populateTextToImageExhibits = useCallback(async (token) => {
    async function refreshImages() {
      const images = await getTextToImageUserExhibits(token);

      setTextToImageExhibitImages(images.reverse());
    }

    refreshImages();

    const interval = setInterval(refreshImages, 60000);

    return () => clearInterval(interval);
  }, []);

  // Get the user balance
  const populateUserbalance = useCallback(async (token) => {
    const balance = await getUserBalance(token);

    setUserBalance(balance);
  }, []);

  useEffect(() => {
    setLoginState(authToken ? "loggedIn" : "initial");
  }, [authToken]);

  useEffect(() => {
    if (!authToken) {
      return;
    }

    (async () => {
      try {
        await Promise.all([
          populateRandomUserExhibits(authToken),
          populateTextToImageExhibits(authToken),
          populateUserbalance(authToken),
        ]);
      } catch (err) {
        if (err.statusCode === 401) {
          window.localStorage.removeItem("authToken");
          setAuthToken();
        }

        throw err;
      }
    })();
  }, [authToken]);

  useEffect(() => {
    const expectedGeneratorCount =
      parseInt(window.localStorage.getItem("expectedGeneratorCount")) || 0;

    updateGeneratorCount(expectedGeneratorCount);
  }, []);

  return (
    <>
      <Head>
        <title>Vana Boilerplate</title>
        <meta name="description" content="Generate portraits with Vana" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* NAV */}
      <Nav>
        {loginState === "loggedIn" && (
          <>
            <div>Credits: {userBalance}</div>
            <div className="divider"></div>
          </>
        )}
      </Nav>

      {/* CONTENT */}
      <main className={styles.main}>
        <div className={`${styles.center} ${styles.container} space-y-2`}>
          {loginState === "initial" && (
            <PromptLogin onSetLoginState={setLoginState} />
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

          {loginState === "loggedIn" && (
            <Prompt
              expectedGeneratorCount={expectedGeneratorCount}
              textToImageExhibitImages={textToImageExhibitImages}
              randomExhibitImages={randomExhibitImages}
            >
              <Generator
                authToken={authToken}
                email={email}
                onSubmit={handleGenerationSubmit}
              />
            </Prompt>
          )}

          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </div>
      </main>
    </>
  );
}
