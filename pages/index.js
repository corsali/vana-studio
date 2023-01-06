import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Generator from '../components/Generator'

import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [user, setUser] = useState();
  const [loginState, setLoginState] = useState();
  const [errorMessage, setErrorMessage] = useState(null);

  const logIn = async (code) => {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            status: 200,
            json: () => {
              return {
                images: ['https://portrait.vana.com/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F87172%2F1670918662-2053232767_go_soo_jung_closeup_portrait-beautiful_flat_illustrated_water_smoke_portrait-realistic_abstract_et.png%3Fauto%3Dformat%26q%3D40%26w%3D1200&w=640&q=75']
              };
            },
          });
        }, 1000);
      });

      if (response.status !== 200) {
        throw new Error("An error occurred while logging in");
      }
      const data = await response.json();
      if (response.ok) {
        setUser({ images: data.images });
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

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
                    .open("https://portrait.vana.com/create", "_blank")
                    .focus()
                }
              >
                Create your Portrait
              </button>
              <p>New to Vana?</p>
              <p>Already have an account?</p>
              <button onClick={() => setLoginState("promptEmail")}>
                Login
              </button>
            </div>
          )}

          {loginState === "promptEmail" && (
            <div>
              <h1>Login with Vana</h1>
              <form>
                <label>
                  Email:
                  <input type="email" name="email" />
                </label>
                <input
                  type="submit"
                  value="Send Verification Code"
                  onClick={() => setLoginState("promptCode")}
                />
              </form>
            </div>
          )}

          {loginState === "promptCode" && (
            <div>
              <h1>Enter Verification Code</h1>
              <form>
                <label>
                  Code:
                  <input type="text" name="code" />
                </label>
                <input
                  type="submit"
                  value="Login"
                  onClick={async (event) => {
                    event.preventDefault();
                    await logIn(event.target.value);
                    setLoginState("loggedIn");
                  }}
                />
              </form>
            </div>
          )}

          {loginState === "loggedIn" && !user.images.length && (
            <div>
              <h1>Create your Vana Portrait</h1>
              <p>It seems we don't have a model for you yet.</p>
              <input
                type="submit"
                value="Create Portrait on Vana"
                onClick={() =>
                  window
                    .open("https://portrait.vana.com/create", "_blank")
                    .focus()
                }
              />
            </div>
          )}

          {loginState === "loggedIn" && user.images.length && (
            <div>
              <Generator />
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
}
