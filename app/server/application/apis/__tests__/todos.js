import supertest from "supertest";
import app from "../../../infrastructure/app";

describe("API: v1/todos", () => {
  it("should return json todos when calling GET request", async () => {
    await supertest(app.listen())
      .get("/api/v1/todos")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
