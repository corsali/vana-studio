import { vanaGet, vanaPost } from "api";

export async function getTextToImageUserExhibits(token, limit) {
  return vanaGet("account/exhibits/text-to-image", {}, token, { limit }).then(
    (res) => res.files
  );
}

export async function getUserExhibits(token) {
  return await vanaGet("account/exhibits", {}, token);
}

export async function getUserAccount(token, userId) {
  return await vanaGet(`account/${userId}`, {}, token);
}

export async function getUserBalance(token) {
  return vanaGet("account/balance", {}, token).then((res) => res.balance);
}

export async function createAuthorizedSession(token, body) {
  return vanaPost("checkout/create-authorized-session", body, token);
}
