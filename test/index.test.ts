import Strapi from "../src";

describe("Creation of SDK instance", () => {
  test("Basic instance", () => {
    const strapi: any = new Strapi();

    expect(strapi).toBeInstanceOf(Strapi);

    expect(Object.getOwnPropertyNames(Object.getPrototypeOf(strapi))).toEqual([
      "constructor",
      "request",
      "find",
      "findOne",
      "count",
      "create",
      "update",
      "delete",
      "graphql",
    ]);

    expect(Object.getOwnPropertyNames(strapi)).toEqual(["options", "axios"]);
  });

  test("Instance with contentTypes", () => {
    const strapi: any = new Strapi({
      contentTypes: ["restaurants"],
    });
    expect(strapi).toBeInstanceOf(Strapi);
    expect(Object.getOwnPropertyNames(Object.getPrototypeOf(strapi))).toEqual([
      "constructor",
      "request",
      "find",
      "findOne",
      "count",
      "create",
      "update",
      "delete",
      "graphql",
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
    expect(strapi).toBeInstanceOf(Strapi);

    expect(strapi.options).toEqual({
      url: "http://strapi-host",
      contentTypes: [
        {
          type: "collection",
          name: "restaurants",
        },
      ],
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
    expect(strapi).toBeInstanceOf(Strapi);

    expect(strapi.options).toEqual({
      url: "http://strapi-host",
      contentTypes: [
        {
          type: "single",
          name: "homepage",
        },
      ],
      axiosOptions: {},
    });

    expect(Object.keys(strapi.homepage)).toEqual(["find", "update", "delete"]);
  });
});
