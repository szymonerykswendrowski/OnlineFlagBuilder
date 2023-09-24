import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Flag Creator</title>
        <link rel="icon" href="/Flag_of_FIAV.svg" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to the <a href="https://github.com/szymonerykswendrowski/OnlineFlagBuilder/blob/main/Project%20Proposal.pdf" target="_blank" rel="noreferrer">Flag Builder</a>
        </h1>

          <a className={styles.card}>
            <h3>How to use &darr;</h3>
            <p>
              Drag the shapes onto the canvas in the middle and then press the upscale button. <br></br>
              To save your template to come back to later click the save button. <br></br>
              To reset your template to blank, either after upscaling an image, or else, click
              the reset button twice. <br></br>
              If you wish to generate another image again, simply scroll down and click the
              upscale button again. <br></br>
            </p>
          </a>
        
        <div className={styles.grid}>
          <a target="_blank" rel="noreferrer"
            href="https://github.com/szymonerykswendrowski/OnlineFlagBuilder/tree/main/Example%20Flags"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>
              Discover the examples of flags generated.
              </p>
          </a>

          <a target="_blank" rel="noreferrer"
            href="https://github.com/szymonerykswendrowski/OnlineFlagBuilder"
            className={styles.card}
          >
            <h3>Source code &rarr;</h3>
            <p>
              Click here to see the project's source code!
            </p>
          </a>
        </div>

        <p className={styles.description}>
          Get started by clicking <Link href="/template">here!</Link>
        </p>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/NextJS.svg" alt="NextJS" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
