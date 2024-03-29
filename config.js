const config = {
  APP_BASE_URL: "https://studiov0.vana.com",
  STRIPE_PRODUCT_100_CREDITS: "price_1MFSirJlfQgmiz8ARWF0hDvZ",
  STRIPE_PRODUCT_250_CREDITS: "price_1MFSiDJlfQgmiz8AkVLSaYvw",
  REMIX_SINGLE_CREDIT_PRICE: 0.1,
  VANA_API_URL: `${
    process.env.NEXT_PUBLIC_VANA_API_URL || "https://api.vana.com"
  }/api/v0`,
  VANA_GITHUB_URL: "https://github.com/corsali/vana-portrait-demo",
  VANA_PORTRAIT_URL: "https://portraitv0.vana.com",
  VANA_SUPPORT_EMAIL: "support@vana.com",
  VANA_BUILDER_EMAIL: "build@vana.com",
  TYPEFORM_BUILDER_URL: "https://usevana.typeform.com/hey-builders",
  vanaTermsURL: "https://www.vana.com/terms-of-service",
  vanaPrivacyURL: "https://www.vana.com/privacy-policy",
};

module.exports = config;