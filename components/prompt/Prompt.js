import { useState, useCallback } from "react";
import Generator from "./Generator";
import homeStyles from "styles/Home.module.css";
import promptStyles from "./Prompt.module.css";

export const Prompt = ({
  user,
  children,
  hasExhibits,
  randomExhibitImages,
}) => {
  const handleCreate = useCallback(() => {
    window.open("https://portrait.vana.com/create", "_blank").focus();
  }, []);

  // console.log(user);

  if (!hasExhibits) {
    return (
      <>
        <h1>Create your Vana Portrait</h1>
        <section className="w-full space-y-3">
          <p className="text-center">
            It seems we don't have a model for you yet.
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
        <div className={promptStyles.gallery}>
          {randomExhibitImages?.map((image, i) => (
            <div key={`${image}-${i}`} className={promptStyles.galleryImage}>
              <img src={image} key={i} />
            </div>
          ))}
        </div>
      </section>

      <section className="w-full space-y-4" style={{ paddingTop: 16 }}>
        {/* Generator component */}
        {children}

        {user.exhibits["text-to-image"].length > 0 && (
          <div className={promptStyles.gallery}>
            {user.exhibits["text-to-image"]?.map((image, i) => (
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
