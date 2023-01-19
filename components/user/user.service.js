import { vanaGet } from "api";

export async function getTextToImageUserExhibits(token) {
  return vanaGet("account/exhibits/text-to-image", {}, token).then(
    (res) => res.urls
  );
}

export async function getRandomUserExhibits(token, count) {
  const exhibitNames = await vanaGet("account/exhibits", {}, token).then((res) =>
    filterExhibits(res.exhibits)
  );

  const randomExhibits = Array(Math.min(exhibitNames, count))
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

// Filter out exhibits that shouldn't be visible for the user in the main gallery
function filterExhibits(exhibitNames) {
  const hiddenExhibits = ["text-to-image"];

  return exhibitNames.filter((name) => !hiddenExhibits.includes(name));
}
