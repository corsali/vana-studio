import { useState } from "react";
import config from "config";
import homeStyles from "styles/Home.module.css";
import { useAuth, Spinner, createAuthorizedSession } from "components";

const Credits = () => {
  const auth = useAuth();
  const authToken = auth.token;
  const [creditsChoice, setCreditsChoice] = useState();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [stripeError, setStripeError] = useState("");

  const getStripeSession = async (numCredits) => {
    let priceId;
    if (numCredits === 50) {
      priceId = config.STRIPE_PRODUCT_100_CREDITS;
    }
    if (numCredits === 100) {
      priceId = config.STRIPE_PRODUCT_250_CREDITS;
    }

    console.log(`Creating a Stripe session for product ${priceId}`);

    const errorMessage =
      "Unable to communicate with Stripe, please contact Vana support.";
    try {
      setIsPurchasing(true);
      const res = await createAuthorizedSession(authToken, {
        successUrl: `${config.APP_BASE_URL}/create`,
        cancelUrl: `${config.APP_BASE_URL}/create`,
        priceId,
      });

      return res.url;
    } catch (e) {
      setStripeError(errorMessage);
      setIsPurchasing(false);
      return null;
    }
  };

  const submitPayment = async (numCredits) => {
    setStripeError("");
    const url = await getStripeSession(numCredits);
    if (url) {
      window.location.assign(url);
    } else {
      setStripeError("Server error, please try again later.");
      setIsPurchasing(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2>Buy more credits</h2>
      <p>
        If you'd like to keep exploring Vana's new Portrait Styles and our other
        AI experiences, you can buy Vana Credits to help cover the computing
        costs it takes to run these apps!
      </p>
      <div className="flex">
        <button
          className={homeStyles.primaryButton}
          onClick={() => {
            setCreditsChoice(50);
            submitPayment(50);
          }}
          disabled={isPurchasing && creditsChoice === 50}
        >
          {isPurchasing && creditsChoice === 50 ? (
            <Spinner />
          ) : (
            <>
              <b>
                ${50 * config.REMIX_SINGLE_CREDIT_PRICE}
              </b>{" "}
              <span>(50 Credits)</span>
            </>
          )}
        </button>
        <button
          className={homeStyles.primaryButton}
          onClick={() => {
            setCreditsChoice(100);
            submitPayment(100);
          }}
          disabled={isPurchasing && creditsChoice === 100}
        >
          {isPurchasing && creditsChoice === 100 ? (
            <Spinner />
          ) : (
            <>
              <b>
                ${100 * config.REMIX_SINGLE_CREDIT_PRICE}
              </b>{" "}
              <span>(100 Credits)</span>
            </>
          )}
        </button>
      </div>

      {/* submission error */}
      {stripeError && (
        <p className="text-error font-medium">Error: {stripeError}</p>
      )}
    </div>
  );
};

export { Credits };
