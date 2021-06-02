import Strapi from "../src";
import Cookies from "js-cookie";

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
      "getAuthenticationProvider",
      "authenticateProvider",
      "logout",
      "find",
      "findOne",
      "count",
      "create",
      "update",
      "delete",
      "graphql",
      "syncToken",
      "setToken",
      "removeToken",
    ]);

    expect(Object.getOwnPropertyNames(strapi)).toEqual(["options", "axios"]);
  });

  test("Instance with existing token in localStorage", () => {
    window.localStorage.setItem("strapi_jwt", "XXX");
    const strapi = new Strapi({
      store: { key: "strapi_jwt", useLocalStorage: true },
    });

    expect(strapi.axios.defaults.headers.common["Authorization"]).toBe(
      "Bearer XXX"
    );

    delete strapi.axios.defaults.headers.common["Authorization"];
    window.localStorage.removeItem("strapi_jwt");
  });

  test("Instance with existing token in Cookies", () => {
    Cookies.set("strapi_jwt", "XXX");
    const strapi = new Strapi({
      store: { key: "strapi_jwt" },
    });

    expect(strapi.axios.defaults.headers.common["Authorization"]).toBe(
      "Bearer XXX"
    );

    expect(Cookies.get("strapi_jwt")).toBe("XXX");

    delete strapi.axios.defaults.headers.common["Authorization"];
    Cookies.remove("strapi_jwt");
  });
});
