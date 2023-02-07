import styles from "styles/Home.module.css";

export const PromptLogin = ({ onSetLoginState }) => {
  return (
    <>
      <h1 className="">
        Vana Studio.{" "}
        {/* <span className="text-gray">Create images of yourself doing whatever you want with your Portrait AI.</span> */}
        <span className="text-gray">
          Create images of yourself in any style. In any place you can think of.
          Doing what you wish. With your Vana Portrait AI.
        </span>
      </h1>

      <section className={`${styles.content} space-y-4`}>
        <button
          onClick={() => onSetLoginState("promptEmail")}
          className={styles.primaryButton}
        >
          Login
        </button>
        <p className={styles.description}>
          New to Vana?{" "}
          <a target="_blank" href="https://portrait.vana.com/create">
            Create your Portrait first
          </a>
        </p>
      </section>
    </>
  );
};
