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

  test("Serializes query params with qs", () => {
    const strapi = new Strapi();
    const paramsSerializer = strapi.axios.defaults.paramsSerializer as {
      serialize: (params: Record<string, unknown>) => string;
    };

    expect(paramsSerializer).toMatchObject({
      serialize: expect.any(Function),
    });

    expect(paramsSerializer?.serialize?.({ fields: ["title", "slug"] })).toBe(
      "fields%5B0%5D=title&fields%5B1%5D=slug"
    );
  });
});
