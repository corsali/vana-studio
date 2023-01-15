import { useCallback } from "react";
import homeStyles from "styles/Home.module.css";
import promptStyles from "./Prompt.module.css";

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
        <h1>Create your Vana Portrait</h1>
        <section className="w-full space-y-3">
          <p>
            You don't have a Portrait model to create with yet.
          </p>
          <button
            type="submit"
            onClick={handleCreate}
            className={homeStyles.primaryButton}
          >
            Create Portrait on Vana
          </button>
        </section>
      </>
    );
  }

  return (
    <>
      <h1>Create with your Portrait</h1>
      <section className="w-full space-y-4">
        <p>Here's some examples from your current portrait model:</p>
        <div
          className={`${promptStyles.gallery} ${promptStyles.galleryHeight}`}
        >
          {randomExhibitImages?.map((image, i) => (
            <div key={`${image}-${i}`} className={promptStyles.galleryImage}>
              <img src={image} key={i} />
            </div>
          ))}
        </div>
      </section>

      {/* Generator component */}
      <section className="w-full space-y-4 pt-4">{children}</section>

      <section className="w-full space-y-4 pt-4">
        <p className={noTextToImageExhibitImages ? "text-gray" : ""}>
          {noTextToImageExhibitImages
            ? "After prompts run, your images will appear here…"
            : "And here's your image results:"}
        </p>

        {noTextToImageExhibitImages ? (
          <div className={promptStyles.gallery}>
            {[1, 2, 3].map((image, i) => (
              <div
                key={`${image}-${i}`}
                className={promptStyles.galleryImage}
              ></div>
            ))}
          </div>
        ) : (
          <div className={promptStyles.gallery}>
            {generationDiff > 0
              ? new Array(generationDiff)
                  .fill()
                  .map((_, i) => (
                    <div
                      key={i}
                      className={promptStyles.galleryImageLoading}
                    ></div>
                  ))
              : undefined}
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
