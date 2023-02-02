import config from "../config";

const vanaFetch = async (path, options = {}, token, params) => {
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const searchParams = new URLSearchParams(sanitizeParams(params));
  const response = await fetch(
    `${config.VANA_API_URL}/${path}?${searchParams}`,
    options
  );

  const data = await response.json();

  if (response.ok && data.success === true) {
    return data;
  } else {
    throw data;
  }
};

const post = async (path, body, token, params = {}) =>
  vanaFetch(
    path,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    },
    token,
    params
  );

/**
 * Removes undefined values from the object
 */
function sanitizeParams(obj) {
  if (!obj) {
    return {};
  }

  Object.keys(obj).forEach((key) =>
    obj[key] === undefined ? delete obj[key] : {}
  );

  return obj;
}

export { vanaFetch, vanaFetch as vanaGet, post as vanaPost };
