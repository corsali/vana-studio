import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import styles from "styles/Home.module.css";
import { useRouter } from "next/router";
import {
  AIWarning,
  PromptLoader,
  Prompt,
  Generator,
  Nav,
  NavLoggedIn,
  Dialog,
  getTextToImageUserExhibits,
  getUserExhibits,
  getUserBalance,
  useAuth,
} from "components";
import { useLocalStorage, useHasMounted } from "hooks";

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

  // Get a list of user's exhibits
  const populateUserExhibits = useCallback(async (token) => {
    const images = await getUserExhibits(token);

    setUserExhibits(images);
  }, []);

  // Get Text to Image exhibit images
  const populateTextToImageExhibits = useCallback(
    async (token) => {
      const images = await getTextToImageUserExhibits(token);

      if (images.length > textToImageExhibitImages.length) {
        setTextToImageExhibitImages(images);
      }
    },
    [textToImageExhibitImages]
  );

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
  }, [authToken]);

  useEffect(refreshUser, [authToken]);

  // Store whether user has seen AI warning in localStorage on mount
  // We use strings rather than booleans, and parse them to booleans when determining to render
  const [hasSeenWarning, setHasSeenWarning] = useLocalStorage(
    "hasSeenWarning",
    "false"
    );

  // Show AI warning on mount
  const [showWarning, setShowWarning] = useState(false);
  const hasMounted = useHasMounted();
  useEffect(() => {
    if (hasMounted) {
      setTimeout(() => {
        if (!JSON.parse(hasSeenWarning)) {
          setShowWarning(true);
        }
      }, 1500);
    }
  }, [hasMounted]);

  const setWarningInLocalStorage = () => {
    setTimeout(() => {
      setHasSeenWarning("true");
    }, 1000);
  }


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
              textToImageExhibitImages={textToImageExhibitImages}
              userExhibits={userExhibits}
            >
              <Generator
                userBalance={userBalance}
                authToken={authToken}
                onSuccess={refreshUser}
              />
            </Prompt>
          )}
        </div>
      </main>

      {/* WARNING */}
      <Dialog
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        showCloseButton
      >
        <AIWarning onOpen={setWarningInLocalStorage} />
      </Dialog>
    </>
  );
}
