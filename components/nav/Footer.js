import config from "config";

const Footer = () => {
  return (
    <footer className="container mx-auto text-center pb-lg text-gray text-3">
      <div className="mb-3 mx-auto">
        <hr style={{ border: "initial", borderTop: "1px solid #ddd"}} />
      </div>
      <a href={config.vanaTermsURL} className="link" target="_blank">
        Terms of Service
      </a>
      &nbsp;&nbsp;&nbsp;
      <a href={config.vanaPrivacyURL} className="link" target="_blank">
        Privacy Policy
      </a>
    </footer>
  );
};

export { Footer };
