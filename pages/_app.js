import "styles/globals.css";
import { Inter, Spectral } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });
const spectral = Spectral({ subsets: ["latin"], weight: '600' });

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Set a default font-family variable to cascade down */}
      <style jsx global>{`
        :root {
          --font-sans: ${inter.style.fontFamily};
          --font-display: ${spectral.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
