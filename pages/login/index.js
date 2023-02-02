import { useState, useCallback } from "react";
import Head from "next/head";
import styles from "styles/Home.module.css";
import { useRouter } from "next/router";
import { PromptEmail, PromptCode, PromptLogin, Nav, useAuth, Footer } from "components";
import { vanaPost } from "api";

/**
 * The entry point for the demo app
 * It contains the state management for the app flow.
 */
export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState();

  // loginState is one of: initial, emailForm, pinCodeForm
  const [loginState, setLoginState] = useState("initial");
  const [errorMessage, setErrorMessage] = useState();
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

        auth.setToken(token);
        router.push("/create");
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    },
    [email]
  );

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
      <Nav />

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

          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
