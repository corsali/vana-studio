import { useCallback } from "react";
import { Marker } from "components";
import homeStyles from "styles/Home.module.css";
import { useRouter } from "next/router";
import promptStyles from "./Prompt.module.css";

export const Prompt = ({
  children,
  userExhibits,
  textToImageExhibitImages,
}) => {
  const router = useRouter();

  const handleCreate = useCallback(() => {
    window.open("https://portrait.vana.com/create", "_blank").focus();
  }, []);

  const handleOpenGallery = useCallback(() => {
    router.push("/gallery");
  }, []);

  const noTextToImageExhibitImages = textToImageExhibitImages.length === 0;

  if (userExhibits.length === 0) {
    return (
      <>
        <h1>Create with your Portrait AI</h1>
        <section className="w-full space-y-3">
          <p>You don't have a Portrait AI model to create with yet.</p>
          <button
            type="submit"
            onClick={handleCreate}
            className={homeStyles.primaryButton}
          >
            Create Portrait AI on Vana
          </button>
        </section>
      </>
    );
  }

  return (
    <>
      <h1>Create with your Portrait AI</h1>

      {/* Generator component */}
      <section className="w-full space-y-4 pt-4">{children}</section>

      <section className="w-full space-y-4 pt-4">
        <p>
          <Marker>2</Marker>
          {noTextToImageExhibitImages
            ? "After prompts run, your images will appear here:"
            : "And here are your image results:"}
        </p>

        {noTextToImageExhibitImages ? (
          <div className={promptStyles.gallery}>
            {[1, 2, 3].map((image, i) => (
              <div
                key={`${image}-${i}`}
                className={promptStyles.galleryImagePlaceholder}
              />
            ))}
          </div>
        ) : (
          <div className={promptStyles.gallery}>
            {/* placeholder gallery for an awaiting prompt job */}

            {/* all prompt results */}
            {textToImageExhibitImages.map((image, i) => (
              <div
                key={`${image.name}-${i}`}
                className={promptStyles.galleryImage}
              >
                <img src={image.url} key={i} />
              </div>
            ))}
          </div>
        )}

        {!noTextToImageExhibitImages && (
          <section className="w-full space-y-3">
            <button
              type="submit"
              onClick={handleOpenGallery}
              className={homeStyles.primaryButton}
            >
              View all images
            </button>
          </section>
        )}
      </section>
    </>
  );
};
