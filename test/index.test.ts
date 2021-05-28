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

  test("Instance with contentTypes", () => {
    const strapi: any = new Strapi({
      contentTypes: ["restaurants"],
    });
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
      "restaurants",
    ]);

    expect(Object.keys(strapi.restaurants)).toEqual([
      "find",
      "findOne",
      "count",
      "create",
      "update",
      "delete",
    ]);
  });

  test("Instance with contentTypes collection object", () => {
    const strapi: any = new Strapi({
      url: "http://strapi-host",
      contentTypes: [
        {
          type: "collection",
          name: "restaurants",
        },
      ],
    });

    expect(strapi.options).toEqual({
      url: "http://strapi-host",
      contentTypes: [
        {
          type: "collection",
          name: "restaurants",
        },
      ],
      store: {
        cookieOptions: {
          path: "/",
        },
        httpOnly: false,
        key: "strapi_jwt",
        useLocalStorage: false,
      },
      axiosOptions: {},
    });

    expect(Object.keys(strapi.restaurants)).toEqual([
      "find",
      "findOne",
      "count",
      "create",
      "update",
      "delete",
    ]);
  });

  test("Instance with contentTypes single object", () => {
    const strapi: any = new Strapi({
      url: "http://strapi-host",
      contentTypes: [
        {
          type: "single",
          name: "homepage",
        },
      ],
    });

    expect(strapi.options).toEqual({
      url: "http://strapi-host",
      contentTypes: [
        {
          type: "single",
          name: "homepage",
        },
      ],
      store: {
        cookieOptions: {
          path: "/",
        },
        httpOnly: false,
        key: "strapi_jwt",
        useLocalStorage: false,
      },
      axiosOptions: {},
    });

    expect(Object.keys(strapi.homepage)).toEqual(["find", "update", "delete"]);
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
