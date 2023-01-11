import { useEffect, useState, useCallback } from "react";
import { VANA_GITHUB_URL } from "config";
import Head from "next/head";
import styles from "styles/Home.module.css";
import {
  EmailForm,
  PinCodeForm,
  LoginForm,
  Prompt,
  Generator,
  Nav,
} from "components";
import { vanaGet, vanaPost } from "vanaApi";

/**
 * The entry point for the demo app
 * It contains the state management for the app flow.
 */
export default function Home() {
  const [email, setEmail] = useState();
  const [user, setUser] = useState({ exhibits: {} });
  const [randomExhibitImages, setRandomExhibitImages] = useState([]);
  const [exhibitExampleImages, setExhibitExampleImages] = useState([]);
  const [loginState, setLoginState] = useState("initial"); // initial, emailForm, pinCodeForm, loggedIn
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

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

  const getPortraitExamples = (exhibits) => {
    const firstThreeExhibits = Object.keys(exhibits).slice(1, 4);
    const firstThreeExhibitsImages = firstThreeExhibits.map((item) => {
      return exhibits[item][0];
    });
    // console.log(firstThreeExhibits);
    // console.log(firstThreeExhibitsImages);

    return firstThreeExhibitsImages;
  };

  useEffect(() => {
    if (user && Object.keys(user.exhibits).length > 0) {
      setExhibitExampleImages(getPortraitExamples(user.exhibits));
    }
  }, [user]);

  const getRandomImages = (count, exhibits) =>
    Array(count)
      .fill()
      .map(() => {
        const exhibitNames = Object.keys(exhibits);
        const randomExhibit =
          exhibitNames[Math.floor(Math.random() * exhibitNames.length)];
        const randomExhibitImages = exhibits[randomExhibit];
        // console.log(randomExhibit);
        // console.log(randomExhibitImages);

        return randomExhibitImages[
          Math.floor(Math.random() * randomExhibitImages.length)
        ];
      });

  const refreshUser = useCallback(async () => {
    console.info("Refreshing the user");
    const refreshExhibits = async (currentUser, exhibitNames) => {
      const exhibitsResponses = await Promise.all(
        exhibitNames.map((exhibit) =>
          vanaGet(`account/exhibits/${exhibit}`, {}, authToken).then(
            (response) => ({ name: exhibit, response })
          )
        )
      );

      const newUser = exhibitsResponses.reduce(
        (user, { name, response }) => {
          if (response.success) {
            user.exhibits[name] = response.urls;
          }
          return user;
        },
        { ...currentUser, exhibits: currentUser.exhibits ?? {} }
      );

      setUser(newUser);
      Object.keys(newUser.exhibits).length &&
        setRandomExhibitImages(getRandomImages(3, newUser.exhibits));
    };

    const [exhibitsPromise, textToImagePromise, balancePromise] = [
      vanaGet("account/exhibits", {}, authToken),
      vanaGet("account/exhibits/text-to-image", {}, authToken),
      vanaGet("account/balance", {}, authToken),
    ];

    const [exhibitsResponse, textToImageResponse, balanceResponse] =
      await Promise.all([exhibitsPromise, textToImagePromise, balancePromise]);

    const newUser = {
      balance: balanceResponse.balance,
      exhibits: {
        ...user.exhibits,
        "text-to-image": textToImageResponse.urls,
      },
    };

    // Populate the text-to-image exhibit quickly
    setUser(newUser);

    // Now populate all exhibits
    refreshExhibits(newUser, exhibitsResponse.exhibits);
  }, [authToken]);

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

  // console.log("randomExhibitImages", randomExhibitImages);
  // console.log("exhibitExampleImages", exhibitExampleImages);

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
        <a href={VANA_GITHUB_URL} target="_blank">
          <GithubIcon />
        </a>
      </header>
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

          {loginState === "loggedIn" && user && (
            <Prompt
              user={user}
              hasExhibits={!!Object.keys(user.exhibits).length}
              // randomExhibitImages={exhibitExampleImages}
              randomExhibitImages={randomExhibitImages}
            >
              <Generator authToken={authToken} email={email} />
            </Prompt>
          )}

          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </div>
      </main>
    </>
  );
}
