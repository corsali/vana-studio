import { regex } from "config/regex";

const TARGET_TOKEN = "{target_token}";

const ALL_ME_REGEX = [
  regex.REGEX_EN_ME,
  regex.REGEX_ES_MI,
  regex.REGEX_ES_MI2,
  regex.REGEX_ES_YO,
]

const replaceRegex = (text, regex) => {
  const match = text.match(regex);
  if (match) {
    return text.replace(regex, TARGET_TOKEN);
  }
  
  return text;
}

const replaceMe = (prompt) => {
  const replaced = ALL_ME_REGEX.reduce((acc, curr) => {
    return replaceRegex(acc, curr);
  }, prompt);

  return replaced;
}

const testMe = (prompt) => {
  const tested = ALL_ME_REGEX.some((regex) => prompt.match(regex));
  return tested;
}

export { replaceMe, testMe }