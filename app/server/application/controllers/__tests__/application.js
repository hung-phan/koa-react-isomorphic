import supertest from "supertest";
import app from "../../../infrastructure/app";

describe("Controller: application", () => {
  it("should render single page", async () => {
    const result = await supertest(app.listen())
      .get("/")
      .set("Accept", "text/html")
      .expect(200);

    expect(result.text).toBeDefined();
  });
});
