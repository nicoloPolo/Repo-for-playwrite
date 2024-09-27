import { test, expect } from "@playwright/test";

test.describe("Garage API test with SID beforeAll", () => {
  let sid;
  let context;

  test.beforeAll(async ({ request, browser }) => {
    const authRequest = await request.post(
      "https://qauto.forstudy.space/api/auth/signin",
      {
        data: {
          email: "Nicolo1@mail.com",
          password: "Pass123!",
          remember: false,
        },
      }
    );

    const cookies = authRequest.headers()["set-cookie"];
    if (cookies) {
      const cookiesArray = cookies.split("\n");
      for (const cookie of cookiesArray) {
        if (cookie.trim().startsWith("sid=")) {
          sid = cookie.trim().split("=")[1].split(";")[0];
          break;
        }
      }
    }

    context = await browser.newContext();
    await context.addCookies([
      {
        name: "sid",
        value: sid,
        domain: "qauto.forstudy.space",
        path: "/",
        httpOnly: true,
        secure: true,
      },
    ]);
  });

  test("test mocking user profile", async () => {
    const page = await context.newPage();
    await page.route(
      "https://qauto.forstudy.space/api/users/profile",
      async (route) => {
        const mockResponse = {
          status: "ok",
          data: {
            name: "John",
            lastName: "Dou",
            userId: 137279,
            photoFilename: "default-user.png",
          },
        };
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockResponse),
        });
      }
    );
  });

  test("test to get /profile body", async ({ request }) => {
    const response = await request.get(
      "https://qauto.forstudy.space/api/users/profile",
      {
        headers: {
          Cookie: `sid=${sid}`,
        },
      }
    );
    const body = await response.json();
    console.log(body);
  });
});
