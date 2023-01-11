import styles from "styles/Home.module.css";

export const LoginForm = ({ onSetLoginState }) => {
  return (
    <>
      <h1>Vana Boilerplate</h1>
      <section className="w-full space-y-4">
        <button
          onClick={() => onSetLoginState("EmailForm")}
          className={styles.primaryButton}
        >
          Login
        </button>
        <p className={styles.description}>
          New to Vana?{" "}
          <a target="_blank" href="https://portrait.vana.com/create">
            Create your Portrait
          </a>
        </p>
      </section>
    </>
  );
};
