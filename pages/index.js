import { useEffect, useState } from 'react';
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Generator from '../components/Generator'
import { vanaGet, vanaPost } from '../vanaApi'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [email, setEmail] = useState();
  const [user, setUser] = useState();
  const [loginState, setLoginState] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [authToken, setAuthToken] = useState();

  const createLogin = async (email) => {
    setEmail(email);
    try {
      await vanaPost('auth/create-login', {
        email,
      });
      setLoginState('promptCode');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const logIn = async (code) => {
    try {
      const { token } = await vanaPost('auth/login', {
        email,
        code
      });

      setAuthToken(token);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const refreshUser = async () => {
      // We don't need this yet
      // const { exhibits } = await vanaGet('account/exhibits', {}, authToken);

      const { urls } = await vanaGet('account/exhibits/vana-boilerplate-dev', {}, authToken);

      setUser({ images: urls });
  }

  useEffect(() => {
    (async () => {
      if (!authToken) {
        setLoginState();
        return;
      }

      setLoginState('loggedIn');

      const refreshUserWithTimeout = async () => {
        await refreshUser();
        setTimeout(refreshUserWithTimeout, 60000);
      }

      refreshUserWithTimeout();

      return () => clearTimeout(refreshUserWithTimeout);
    })();
  }, [authToken]);

  return (
    <>
      <Head>
        <title>My Vana App</title>
        <meta name="description" content="Generate portraits with Vana" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Modify this app by editing&nbsp;
            <code className={styles.code}>pages/index.js</code>
          </p>
        </div>

        <div className={styles.center}>
          {!loginState && (
            <div>
              <h1>Welcome to Vana Boilerplate</h1>
              <button
                onClick={() =>
                  window
                    .open('https://portrait.vana.com/create', '_blank')
                    .focus()
                }
              >
                Create your Portrait
              </button>
              <p>New to Vana?</p>
              <p>Already have an account?</p>
              <button onClick={() => setLoginState('promptEmail')}>
                Login
              </button>
            </div>
          )}

          {errorMessage && <div>{errorMessage}</div>}

          {loginState === 'promptEmail' && (
            <div>
              <h1>Login with Vana</h1>
              <form onSubmit={(event) => {
                  event.preventDefault();
                  createLogin(event.target.elements.email.value);
                }}>
                <label>
                  Email:
                  <input type="email" name="email" />
                </label>
                <input
                  type="submit"
                  value="Send Verification Code"
                />
              </form>
            </div>
          )}

          {loginState === 'promptCode' && (
            <div>
              <h1>Enter Verification Code</h1>
              <form onSubmit={(event) => {
                  event.preventDefault();
                  logIn(event.target.elements.code.value);
                }}>
                <label>
                  Code:
                  <input type="text" name="code" />
                </label>
                <input
                  type="submit"
                  value="Login"
                />
              </form>
            </div>
          )}

          {loginState === 'loggedIn' && user && !user.images.length && (
            <div>
              <h1>Create your Vana Portrait</h1>
              <p>It seems we don't have a model for you yet.</p>
              <input
                type="submit"
                value="Create Portrait on Vana"
                onClick={() =>
                  window
                    .open('https://portrait.vana.com/create', '_blank')
                    .focus()
                }
              />
            </div>
          )}

          {loginState === 'loggedIn' && user && user.images.length && (
            <div>
              <Generator authToken={authToken} email={email} />
              {user.images.map((image, i) => (
                <img src={image} key={i} />
              ))}
            </div>
          )}
        </div>

        <div className={styles.grid}>
          <a
            href="https://api.vana.com"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              API Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about how to use the Vana API.
            </p>
          </a>

          <a
            href="https://github.com/corsali/vana-boilerplate"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              GitHub <span>-&gt;</span>
            </h2>
            <p className={inter.className}>View this app on GitHub.</p>
          </a>

          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Next.js Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find information about the Next.js framework that this template is
              built on.
            </p>
          </a>
        </div>
      </main>
    </>
  );
};
