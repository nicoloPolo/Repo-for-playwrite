import { expect, test } from "@playwright/test";

test.describe("POST tests: 1 positive + 2 negative", () => {
  let sid;

  test.beforeEach(async ({ request }) => {
    const authRequest = await request.post("api/auth/signin", {
      data: {
        email: "Nicolo1@mail.com",
        password: "Pass123!",
        remember: false,
      },
    });
  });

  test("/cars tests with POST method positive", async ({ request }) => {
    const response = await request.post("/api/cars", {
      data: {
        carBrandId: 3,
        carModelId: 13,
        mileage: 838,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    console.log(body);
    expect(body.status).toBe("ok");
  });

  test("/cars tests with POST method negative", async ({ request }) => {
    const response = await request.post("/api/cars", {
      data: {
        carBrandId: null,
        carModelId: 13,
        mileage: 838,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    console.log(body);
    expect(body.message).toBe("Invalid car brand type");
  });

  test("/cars tests with POST method negative1", async ({ request }) => {
    const response = await request.post("/api/cars", {
      data: {
        carBrandId: 1,
        carModelId: 13,
        mileage: "invalid",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    console.log(body);
    expect(body.message).toBe("Invalid mileage type");
  });
});
