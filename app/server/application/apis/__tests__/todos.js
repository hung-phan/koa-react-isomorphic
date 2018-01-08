import supertest from "supertest";
import app from "../../../infrastructure/app";

describe("API: v1/todos", () => {
  it("should return json todos when calling GET request", () => {
    return supertest(app.listen())
      .get("/api/v1/todos")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
