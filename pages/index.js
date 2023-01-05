import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Generator from '../components/Generator'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
          <Generator/> 
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
            <p className={inter.className}>
              View this app on GitHub.
            </p>
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
              Find information about the Next.js framework that this template is built on.
            </p>
          </a>


        </div>
      </main>
    </>
  )
}
