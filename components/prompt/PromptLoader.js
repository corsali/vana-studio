import { Marker, GENERATED_SAMPLES } from "components";
import homeStyles from "styles/Home.module.css";
import promptStyles from "./Prompt.module.css";

/* 
  A loader that replicates the skeletong of the Prompt layout.
  No attempt to componentise this from existing layouts in Prompt and Generator as it's a one-off.
*/

export const PromptLoader = () => (
  <>
    <h1>Create with your Portrait AI</h1>
    
    {/* Generator component */}
    <section className="w-full space-y-4 pt-4">
      <div className={promptStyles.generatorLabel}>
        <span>
          <Marker>1</Marker>Write a detailed prompt including the word "me":
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
          <>Create {GENERATED_SAMPLES} images (~20 seconds)</>
        </button>
        <div className="text-gray text-3">Each attempt is {GENERATED_SAMPLES} credits</div>
      </form>
    </section>

    {/* Images */}
    <section className="w-full space-y-4 pt-4">
      <p>
        <Marker>2</Marker>After prompts run, your images will appear here:
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
