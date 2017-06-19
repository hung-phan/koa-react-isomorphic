/* @flow */
export const redirectTo = (url: string): void => {
  Object.defineProperty(window.location, "href", {
    writable: true,
    value: url
  });
};
