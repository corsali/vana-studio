import { vanaGet } from "api";

export async function getTextToImageUserExhibits(token) {
  return vanaGet("account/exhibits/text-to-image", {}, token).then(
    (res) => res.urls
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
