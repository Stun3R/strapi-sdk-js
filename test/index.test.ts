import Strapi from "../src";

describe("Creation of SDK instance", () => {
  test("Basic instance", () => {
    const strapi: any = new Strapi();

    expect(strapi).toBeInstanceOf(Strapi);

    expect(Object.getOwnPropertyNames(Object.getPrototypeOf(strapi))).toEqual([
      "constructor",
      "request",
      "login",
      "register",
      "forgotPassword",
      "resetPassword",
      "sendEmailConfirmation",
      "getProviderAuthenticationUrl",
      "authenticateProvider",
      "logout",
      "find",
      "findOne",
      "create",
      "update",
      "delete",
      "fetchUser",
      "getToken",
      "setToken",
      "removeToken",
    ]);

    expect(Object.getOwnPropertyNames(strapi)).toEqual([
      "user",
      "options",
      "axios",
    ]);
  });
});
