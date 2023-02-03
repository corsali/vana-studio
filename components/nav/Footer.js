import config from "config";

const Footer = () => {
  return (
    <footer className="container mx-auto text-center pb-lg text-gray text-3 space-y-5">
      <div className="mx-auto">
        <hr style={{ border: "initial", borderTop: "1px solid #ddd" }} />
      </div>
      <p className="pt-3">
        If you have any issues, please reach out to:{" "}
        <a href="mailto:support@vana.com">support@vana.com</a>
      </p>
      <div className="flex justify-center gap-4 h-full">
        <a href={config.vanaTermsURL} className="link" target="_blank">
          Terms of Service
        </a>
        <div className="divider" style={{ height: "18px", flex: "initial" }}></div>
        <a href={config.vanaPrivacyURL} className="link" target="_blank">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export { Footer };
