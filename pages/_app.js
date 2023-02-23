import "styles/globals.css";
import { Inter } from "@next/font/google";
import { AuthProvider } from "components/auth/useAuth";
import config from "config";
import { PageNotice } from "components/page-notice/PageNotice";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  // Send devs a secret message
  console.log(
    `👋🏼 Hey there! 👋🏼\n\nIf you're a developer/builder/anything, we'd love to hear from you! Send us a email ${config.VANA_BUILDER_EMAIL} or fill out this form ${config.TYPEFORM_BUILDER_URL} to get in touch.`
  );

  return (
    <>
      {/* Set a default font-family variable to cascade down */}
      <style jsx global>{`
        :root {
          --font-sans: ${inter.style.fontFamily};
        }
      `}</style>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
