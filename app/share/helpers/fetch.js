import fetch from "isomorphic-fetch";

export const getBaseUrl = () => {
  if (process.env.RUNTIME_ENV === "client") {
    return "";
  }

  const PORT = process.env.PORT;

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
  if (process.env.RUNTIME_ENV === "client") {
    options.headers = {
      ...options.headers,
      "X-CSRF-Token": window.__csrf
    };
  }

  return fetch(`${baseUrl}${url}`, {
    mode: baseUrl ? "cors" : "same-origin",
    credentials: baseUrl ? "include" : "same-origin",
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options && options.headers)
    }
  });
};

export default create(getBaseUrl());
