import { vanaGet } from "api";

export async function getTextToImageUserExhibits(token) {
  return vanaGet("account/exhibits/text-to-image", {}, token).then(
    (res) => res.urls
  );
}

export async function getRandomUserExhibits(token, count) {
  const exhibitNames = await vanaGet("account/exhibits", {}, token).then(
    (res) => res.exhibits
  );

  const randomExhibits = Array(count)
    .fill()
    .map(() => exhibitNames[Math.floor(Math.random() * exhibitNames.length)]);

  const exhibitImages = await Promise.all(
    randomExhibits.map((exhibit) =>
      vanaGet(`account/exhibits/${exhibit}`, {}, token).then(
        (response) => response.urls
      )
    )
  );

  const randomExhibitImages = exhibitImages.map(
    (urls) => urls[Math.floor(Math.random() * urls.length)]
  );

  return randomExhibitImages;
}

export async function getUserBalance(token) {
  return vanaGet("account/balance", {}, token).then((res) => res.balance);
}
