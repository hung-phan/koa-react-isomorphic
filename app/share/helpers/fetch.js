import omit from "lodash/omit";
import fetch from "isomorphic-fetch";

export const getBaseUrl = () => {
  if (process.env.RUNTIME_ENV === "client") {
    return "";
  }

  const { PORT } = process.env;

  if (!PORT) {
    throw new Error("Missing 'process.env.PORT'.");
  }

  return `http://localhost:${PORT}`;
};

// Default options for the Fetch API
// https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
export const create = (baseUrl: string) => (
  url: string,
  options: Object = {}
) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(options && options.headers)
  };

  if (process.env.RUNTIME_ENV === "client") {
    Object.assign(headers, {
      "X-CSRF-Token": window.__csrf
    });
  } else {
    Object.assign(headers, {
      "X-App-Secret": process.env.SECRET_KEY
    });
  }

  return fetch(`${baseUrl}${url}`, {
    headers,
    mode: baseUrl ? "cors" : "same-origin",
    credentials: baseUrl ? "include" : "same-origin",
    ...omit(options, "headers")
  });
};

export default create(getBaseUrl());
