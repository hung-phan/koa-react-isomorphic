import supertest from "supertest";
import app from "../../../infrastructure/app";

describe("Controller: application", () => {
  const request = supertest(app.listen());

  it("should render single page", async () => {
    const result = await request
      .get("/")
      .set("Accept", "text/html")
      .set("X-CSRF-Token", process.env.SECRET_KEY.toString("base64"))
      .expect(200);

    expect(result.text).toBeDefined();
    expect(result.text).toContain(`id="app"`);
  });
});
