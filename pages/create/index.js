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
  Footer,
  getTextToImageUserExhibits,
  getUserExhibits,
  getUserBalance,
  useAuth,
  Spinner,
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
      const images = await getTextToImageUserExhibits(token, 9);
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
  };

  return (
    <>
      <Head>
        <title>Vana Studio</title>
        <meta name="description" content="Generate custom portraits with Vana" />
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
        <div className={`${styles.center} container space-y-3`}>
          {!auth.user ? (
            <>
              <h1>Create with your Portrait AI</h1>
              <div className="flex items-center justify-center py-2">
                <Spinner />
              </div>
            </>
          ) : (
            <CreateFlow
              loading={loading}
              user={auth.user}
              userExhibits={userExhibits}
              textToImageExhibitImages={textToImageExhibitImages}
              userBalance={userBalance}
              authToken={authToken}
              refreshUser={refreshUser}
            />
          )}
        </div>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* WARNING */}
      <Dialog
        isOpen={showWarning}
        onClose={() => {
          setShowWarning(false);
          setWarningInLocalStorage();
        }}
        showCloseButton
      >
        <AIWarning />
      </Dialog>
    </>
  );
}

export const CreateFlow = ({
  user,
  loading,
  userExhibits,
  textToImageExhibitImages,
  userBalance,
  authToken,
  refreshUser,
}) => {
  if (!user.is_verified) {
    return (
      <>
        {/* User is not Verified */}
        <h1>Create with your Portrait AI</h1>
        <p>
          Uh oh...access to Vana Studio beta is only available to a select few.{" "}
          <br /> Get on the waitlist now to{" "}
          <a href="https://vana.com/studio" target="_blank">
            reserve your spot
          </a>
          !
        </p>
      </>
    );
  }

  if (loading) {
    return <PromptLoader />;
  }

  return (
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
  );
};
