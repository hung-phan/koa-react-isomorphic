/* @flow */
/* global process */
import fetch from "isomorphic-fetch";

const create = (baseUrl: string) => {
  // Default options for the Fetch API
  // https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
  const defaults = {
    mode: baseUrl ? "cors" : "same-origin",
    credentials: baseUrl ? "include" : "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  return {
    fetch: <T>(url: string, options: { [key: string]: any } = {}): Promise<T> =>
      fetch(`${baseUrl}${url}`, {
        ...defaults,
        ...options,
        headers: {
          ...defaults.headers,
          ...(options && options.headers)
        }
      })
  };
};

let baseUrl;

if (process.env.RUNTIME_ENV === "client") {
  baseUrl = "";
} else {
  const PORT = process.env.PORT;

  if (!PORT) {
    throw new Error("Missing 'process.env.PORT'.");
  }

  baseUrl = `http://localhost:${PORT}`;
}

export default create(baseUrl);
