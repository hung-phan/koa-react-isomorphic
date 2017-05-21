import { getUrl } from "../handleHTTP";

describe("Helper: getUrl", () => {
  it("should return url '/api/v1/todos' in client environment", () => {
    process.env.RUNTIME_ENV = "client";

    const url = "/api/v1/todos";
    expect(getUrl(url)).toEqual(url);
  });

  it(
    `should return url 'http://localhost:${process.env.PORT}/api/v1/todos' in server environment`,
    () => {
      process.env.RUNTIME_ENV = "server";

      const url = "/api/v1/todos";
      expect(getUrl(url)).toEqual(`http://localhost:${process.env.PORT}${url}`);
    }
  );
});
