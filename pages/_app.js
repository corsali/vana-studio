import "styles/globals.css";
import { Inter, Source_Serif_Pro } from "@next/font/google";
import { AuthProvider } from 'components/auth/useAuth';

const inter = Inter({ subsets: ["latin"] });
const source = Source_Serif_Pro({ subsets: ["latin"], weight: "900" });

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Set a default font-family variable to cascade down */}
      <style jsx global>{`
        :root {
          --font-sans: ${inter.style.fontFamily};
          --font-display: ${source.style.fontFamily};
        }
      `}</style>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
