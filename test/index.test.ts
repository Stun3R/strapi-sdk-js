import Strapi from "../src";

describe("Creation of SDK instance", () => {
  test("Basic instance", () => {
    const strapi = new Strapi();

    expect(strapi).toBeInstanceOf(Strapi);

    expect(
      Object.getOwnPropertyNames(Object.getPrototypeOf(strapi)).sort()
    ).toEqual(
      [
        "constructor",
        "request",
        "login",
        "register",
        "changePassword",
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
      ].sort()
    );

    expect(Object.getOwnPropertyNames(strapi).sort()).toEqual(
      ["user", "options", "axios"].sort()
    );
  });
});
