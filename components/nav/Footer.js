import config from "config";

const Footer = () => {
  return (
    <footer className="text-center pb-lg text-gray">
      <a href={config.vanaTermsURL} className="link">
        Terms of use
      </a>
    </footer>
  );
};

export { Footer };
