import { useEffect, useState, useCallback } from "react";
import galleryStyles from "./gallery.module.css";
import styles from "styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ArrowLeftIcon,
  Nav,
  NavLoggedIn,
  useAuth,
  getTextToImageUserExhibits,
  getUserBalance,
  Footer,
} from "components";

export default function GalleryPage() {
  const router = useRouter();
  const auth = useAuth();
  const authToken = auth.token;
  const [userBalance, setUserBalance] = useState(0);
  const [loading, setLoading] = useState();
  const [textToImageExhibitImages, setTextToImageExhibitImages] = useState([]);

  // Get Text to Image exhibit images
  const populateTextToImageExhibits = useCallback(async (token) => {
    const images = await getTextToImageUserExhibits(token);

    setTextToImageExhibitImages(images);
  }, []);

  // Get the user balance
  const populateUserBalance = useCallback(async (token) => {
    const balance = await getUserBalance(token);

    setUserBalance(balance);
  }, []);

  useEffect(() => {
    (async () => {
      if (!authToken) {
        return;
      }

      try {
        setLoading(true);
        await Promise.all([
          populateTextToImageExhibits(authToken),
          populateUserBalance(authToken),
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, [populateTextToImageExhibits, populateUserBalance, authToken]);

  const handleCreate = useCallback(() => {
    router.push("/create");
  }, []);

  return (
    <>
      {/* NAV */}
      <Nav>{!loading && <NavLoggedIn userBalance={userBalance} />}</Nav>

      {/* CONTENT */}
      <main className={styles.main}>
        <section className={`${styles.center} container space-y-3`}>
          {!loading && textToImageExhibitImages.length === 0 ? (
            <>
              <h1>Your gallery</h1>
              <section className="w-full space-y-4 pt-4">
                <p>You don't have a Portrait AI model to create with yet.</p>
                <button
                  type="submit"
                  onClick={handleCreate}
                  className={styles.primaryButton}
                >
                  Create your Portrait AI
                </button>
              </section>
            </>
          ) : (
            <>
              <div className="w-full space-y-5">
                <h1>Your gallery</h1>
                <div className={`${galleryStyles.backLink} text-3`}>
                  <ArrowLeftIcon />
                  <Link href="/create">Back to create</Link>
                </div>
              </div>
              <section className="w-full space-y-4 pt-3">
                <div className={galleryStyles.gallery}>
                  {loading
                    ? new Array(8)
                        .fill(null)
                        .map((image, i) => (
                          <div
                            key={`${image}-${i}`}
                            className={galleryStyles.galleryImageLoading}
                          />
                        ))
                    : textToImageExhibitImages.map((image, i) => (
                        <div
                          key={`${image}-${i}`}
                          className={galleryStyles.galleryImage}
                        >
                          <img src={image} key={i} />
                        </div>
                      ))}
                </div>
              </section>
            </>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
