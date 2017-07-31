import { redirectTo } from "../handleHTTP";

test("redirectTo", () => {
  redirectTo("https://github.com/hung-phan/koa-react-isomorphic");
  expect(window.location.href).toBe(
    "https://github.com/hung-phan/koa-react-isomorphic"
  );
});
