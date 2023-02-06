import * as jose from "jose";

export function parseJWT(token) {
  if (!token) {
    return;
  }

  const claims = jose.decodeJwt(token);

  // Check that JWT hasn't expired
  if (claims && claims.exp) {
    const isExpired = Date.now() >= claims.exp * 1000;
    if (isExpired) {
      console.warn("User's token has expired, logging out");
      window.localStorage.removeItem("authToken");
      return null;
    }
  }

  return claims;
}
