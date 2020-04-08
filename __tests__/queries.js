const app = require("../src/server");
const supertest = require("supertest");

const request = supertest(app);

test("fetch users", async () => {
  const response = await request
    .post("/graphql")
    .send({
      query: "{ users{ id, name} }",
    })
    .set("Accept", "application/json");

  expect(response.status).toBe(200);
  expect(response.body).toBeInstanceOf(Object);
  expect(response.body.data.users.length).toEqual(3);
});

test("endpoint that does not exist", async () => {
  const response = await request
    .post("/graphql")
    .send({
      query: "{ events{ id, name} }",
    })
    .set("Accept", "application/json");

  expect(response.status).toBe(400);
});
