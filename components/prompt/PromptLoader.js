import { Marker, Spinner, GENERATED_SAMPLES } from "components";
import homeStyles from "styles/Home.module.css";
import promptStyles from "./Prompt.module.css";
import config from "config";

/* 
  A loader that replicates the skeletong of the Prompt layout.
  No attempt to componentise this from existing layouts in Prompt and Generator as it's a one-off.
*/

export const PromptLoader = () => (
  <>
    <h1>Create with your Portrait AI</h1>
    <section className="w-full space-y-4">
      <p>
        <Marker>1</Marker>Here are some examples from your{" "}
        <a
          href={config.VANA_PORTRAIT_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          current Portrait AI model
        </a>
        :
      </p>
      <div className={`${promptStyles.gallery} ${promptStyles.galleryHeight}`}>
        {[1, 2, 3].map((image, i) => (
          <div
            key={`${image}-${i}`}
            className={promptStyles.galleryImageLoading}
          >
            <Spinner />
          </div>
        ))}
      </div>
    </section>

    {/* Generator component */}
    <section className="w-full space-y-4 pt-4">
      <div className={promptStyles.generatorLabel}>
        <span>
          <Marker showArrow>2</Marker>Write a detailed prompt (including the
          word "me"):
        </span>
        <span className="text-gray">
          <button className={homeStyles.unstyledButton} disabled>
            Need ideas?
          </button>
        </span>
      </div>
      <form className="space-y-4">
        <textarea
          id="prompt-input"
          type="text"
          placeholder="Realistic oil painting of me eating green spaghetti"
          className={homeStyles.largeTextarea}
          disabled
        />
        <button type="submit" className={homeStyles.primaryButton} disabled>
          <>Create {GENERATED_SAMPLES} images (~7 mins)</>
        </button>
        <div className="text-gray text-3">Each attempt is 10 credits</div>
      </form>
    </section>

    {/* Images */}
    <section className="w-full space-y-4 pt-4">
      <p>
        <Marker showArrow>3</Marker>After prompts run, your images will appear
        here:
      </p>
      <div className={promptStyles.gallery}>
        {[1, 2, 3].map((image, i) => (
          <div
            key={`${image}-${i}`}
            className={promptStyles.galleryImagePlaceholder}
          />
        ))}
      </div>
    </section>
  </>
);
