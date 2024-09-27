import { expect, test } from "@playwright/test";

/* test("/cars/models is pub GET request", async ({ request }) => {
  const response = await request.get("/api/cars/models");
  const body = await response.json();
  const allCars = body.data;
  const carTitle = allCars[10].title;
  expect(carTitle).toEqual("Fiesta");
  expect(allCars.length).toEqual(23);
  expect(body.status).toEqual("ok");
}); */

test.describe("Garage API test with SID beforeAll", () => {
  let sid;

  test.beforeAll(async ({ request }) => {
    const authRequest = await request.post("api/auth/signin", {
      data: {
        email: "Nicolo1@mail.com",
        password: "Pass123!",
        remember: false,
      },
    });
    const cookies = authRequest.headers()["set-cookie"];
    console.log(authRequest.headers());
    if (cookies) {
      const cookiesArray = cookies.split("/n");
      for (const cookie of cookiesArray) {
        if (cookie.trim().startsWith("sid=")) {
          sid = cookie.trim().split("=")[1].split(";")[0];
          break;
        }
      }
    }
  });

  test("/cars is private GET request with auth beforeEach", async ({
    request,
  }) => {
    const response = await request.get("/api/cars", {
      headers: {
        Cookie: `sid=${sid}`,
      },
    });
    const body = await response.json();
    console.log(body);
  });
});
