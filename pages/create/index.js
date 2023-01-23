import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import styles from "styles/Home.module.css";
import { useRouter } from "next/router";
import {
  PromptLoader,
  Prompt,
  Generator,
  Nav,
  NavLoggedIn,
  getTextToImageUserExhibits,
  getUserExhibits,
  getUserBalance,
  GENERATED_SAMPLES,
  useAuth,
} from "components";

/**
 * The entry point for the demo app
 * It contains the state management for the app flow.
 */
export default function CreatePage() {
  const router = useRouter();
  const auth = useAuth();
  const authToken = auth.token;
  const [userBalance, setUserBalance] = useState(0);

  const [textToImageExhibitImages, setTextToImageExhibitImages] = useState([]);
  const [userExhibits, setUserExhibits] = useState([]);

  const [loading, setLoading] = useState();

  const [expectedGeneratorCount, setExpectedGeneratorCount] = useState(0);

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

    updateGeneratorCount(expectedGeneratorCount + GENERATED_SAMPLES);
  }, [textToImageExhibitImages]);

  const handleGenerationFailure = useCallback(() => {
    let expectedGeneratorCount =
      parseInt(window.localStorage.getItem("expectedGeneratorCount")) || 0;

    updateGeneratorCount(Math.max(0, expectedGeneratorCount - GENERATED_SAMPLES));
  });

  // Get a list of user's exhibits
  const populateUserExhibits = useCallback(async (token) => {
    const images = await getUserExhibits(token);

    setUserExhibits(images);
  }, []);

  // Get Text to Image exhibit images
  const populateTextToImageExhibits = useCallback(async (token) => {
    async function refreshImages() {
      const images = await getTextToImageUserExhibits(token);

      setTextToImageExhibitImages(images);
    }

    refreshImages();

    const interval = setInterval(refreshImages, 60000);

    return () => clearInterval(interval);
  }, []);

  // Get the user balance
  const populateUserBalance = useCallback(async (token) => {
    const balance = await getUserBalance(token);

    setUserBalance(balance);
  }, []);

  const refreshUser = useCallback(() => {
    if (!authToken) {
      router.replace("/login");
      return;
    }

    setLoading(true);

    (async () => {
      try {
        await Promise.all([
          populateUserExhibits(authToken),
          populateTextToImageExhibits(authToken),
          populateUserBalance(authToken),
        ]);
      } catch (err) {
        if (err.statusCode === 401) {
          auth.setToken();
        }

        throw err;
      } finally {
        setLoading(false);
      }
    })();
  }, [authToken])

  useEffect(refreshUser, [authToken]);

  useEffect(() => {
    const expectedGeneratorCount =
      parseInt(window.localStorage.getItem("expectedGeneratorCount")) || 0;

    updateGeneratorCount(expectedGeneratorCount);
  }, []);

  return (
    <>
      <Head>
        <title>Vana Demo App</title>
        <meta name="description" content="Generate portraits with Vana" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* NAV */}
      <Nav>{!loading && <NavLoggedIn userBalance={userBalance} />}</Nav>

      {/* CONTENT */}
      <main className={styles.main}>
        <div className={`${styles.center} ${styles.container} space-y-2`}>
          {loading ? (
            <PromptLoader />
          ) : (
            <Prompt
              expectedGeneratorCount={expectedGeneratorCount}
              textToImageExhibitImages={textToImageExhibitImages}
              userExhibits={userExhibits}
            >
              <Generator
                userBalance={userBalance}
                authToken={authToken}
                onSubmit={handleGenerationSubmit}
                onSuccess={refreshUser}
                onFailure={handleGenerationFailure}
              />
            </Prompt>
          )}
        </div>
      </main>
    </>
  );
}
