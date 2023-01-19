import { useCallback } from "react";
import { Marker, Spinner } from "components";
import homeStyles from "styles/Home.module.css";
import promptStyles from "./Prompt.module.css";
import config from "config";

export const Prompt = ({
  children,
  randomExhibitImages,
  expectedGeneratorCount,
  textToImageExhibitImages,
}) => {
  const handleCreate = useCallback(() => {
    window.open("https://portrait.vana.com/create", "_blank").focus();
  }, []);

  const generationDiff =
    expectedGeneratorCount - textToImageExhibitImages.length;

  const noTextToImageExhibitImages =
    textToImageExhibitImages.length === 0 && generationDiff <= 0;

  if (randomExhibitImages.length === 0) {
    return (
      <>
        <h1>Create your Vana Portrait AI</h1>
        <section className="w-full space-y-3">
          <p>
            You don't have a Portrait AI model to create with yet.
          </p>
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
            {generationDiff > 0
              ? new Array(generationDiff).fill().map((_, i) => (
                  <div key={i} className={promptStyles.galleryImageLoading}>
                    <Spinner />
                  </div>
                ))
              : undefined}

            {/* all prompt results */}
            {textToImageExhibitImages.map((image, i) => (
              <div key={`${image}-${i}`} className={promptStyles.galleryImage}>
                <img src={image} key={i} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};
