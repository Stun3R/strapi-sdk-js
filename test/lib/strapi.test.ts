import Strapi from "../../src";
import sinon from "sinon";

interface TestContext {
  strapi: Strapi;
  axiosRequest: sinon.SinonStub;
}

describe("Strapi SDK", () => {
  let context: TestContext;

  beforeEach(() => {
    const strapi = new Strapi({
      url: "http://strapi-host/",
      contentTypes: [
        {
          name: "restaurants",
          type: "collection",
        },
      ],
      axiosOptions: {},
    });

    context = {
      strapi,
      axiosRequest: sinon.stub(strapi.axios, "request").resolves({
        data: {},
      }),
    };
  });

  describe("Axios request", () => {
    test("Basic Axios Request", async () => {
      await context.strapi.request("get", "/users", {
        params: {
          _sort: "username:ASC",
        },
      });

      expect(
        context.axiosRequest.calledWithExactly({
          method: "get",
          url: "/users",
          params: {
            _sort: "username:ASC",
          },
        })
      );
    });
  });

  test("Request with custom axios config", async () => {
    await context.strapi.request("get", "/users", {
      headers: {
        Authorization: "Bearer jwt",
      },
    });

    expect(
      context.axiosRequest.calledWithExactly({
        headers: {
          Authorization: "Bearer jwt",
        },
        method: "get",
        url: "/users",
      })
    ).toBe(true);
  });

  describe("Catch Strapi error request", () => {
    test("Array error message", async () => {
      context.axiosRequest.rejects({
        response: {
          status: "400",
          statusText: "Bad Request",
          data: {
            message: [
              {
                messages: [
                  {
                    id: "Auth.form.error.email.invalid",
                  },
                ],
              },
            ],
          },
        },
      });

      let response = false;
      try {
        await context.strapi.request("get", "/users");
      } catch (error) {
        response = error;
      }

      expect(response).toMatchObject({
        isStrapi: true,
        response: {
          status: "400",
          statusText: "Bad Request",
          message: {
            id: "Auth.form.error.email.invalid",
          },
          original: {
            message: [
              {
                messages: [
                  {
                    id: "Auth.form.error.email.invalid",
                  },
                ],
              },
            ],
          },
        },
      });
    });

    test("Object error message", async () => {
      context.axiosRequest.rejects({
        response: {
          status: "400",
          statusText: "Bad Request",
          data: {
            message: [
              {
                error: "Strapi Error",
              },
            ],
          },
        },
      });

      let response = false;
      try {
        await context.strapi.request("get", "/users");
      } catch (error) {
        response = error;
      }

      expect(response).toMatchObject({
        isStrapi: true,
        response: {
          status: "400",
          statusText: "Bad Request",
          message: {
            error: "Strapi Error",
          },
          original: {
            message: [
              {
                error: "Strapi Error",
              },
            ],
          },
        },
      });
    });

    test("Simple string error", async () => {
      context.axiosRequest.rejects({
        response: {
          status: "400",
          statusText: "Bad Request",
          data: {
            message: "Strapi error",
          },
        },
      });

      let response = false;
      try {
        await context.strapi.request("get", "/users");
      } catch (error) {
        response = error;
      }

      expect(response).toMatchObject({
        isStrapi: true,
        response: {
          status: "400",
          statusText: "Bad Request",
          message: "Strapi error",
          original: { message: "Strapi error" },
        },
      });
    });
  });

  test("Catch Network error request", async () => {
    context.axiosRequest.rejects(new Error("Network Error"));

    let response = false;
    try {
      await context.strapi.request("get", "/users");
    } catch (error) {
      response = error;
    }

    expect(response).toMatchObject({
      isStrapi: false,
      response: "Network Error",
    });
  });

  describe("Entries", () => {
    test("find - Get a list of {content-type} entries", async () => {
      await context.strapi.find("restaurants", {
        _sort: "name:ASC",
      });

      expect(
        context.axiosRequest.calledWith({
          method: "get",
          params: {
            _sort: "name:ASC",
          },
          url: "/restaurants",
        })
      ).toBe(true);
    });

    test("findOne - Get a specific {content-type} entry", async () => {
      await context.strapi.findOne("restaurants", 1);

      expect(
        context.axiosRequest.calledWithExactly({
          method: "get",
          url: "/restaurants/1",
        })
      ).toBe(true);
    });

    test("count - Count {content-type} entries", async () => {
      await context.strapi.count("restaurants", {
        name_contains: "baguette",
      });

      expect(
        context.axiosRequest.calledWithExactly({
          method: "get",
          params: {
            name_contains: "baguette",
          },
          url: "/restaurants/count",
        })
      ).toBe(true);
    });

    test("create - Create a {content-type} entry", async () => {
      await context.strapi.create("restaurants", {
        name: "La Fourchette",
      });

      expect(
        context.axiosRequest.calledWithExactly({
          method: "post",
          url: "/restaurants",
          data: {
            name: "La Fourchette",
          },
        })
      ).toBe(true);
    });

    test("update - Update a {content-type} entry", async () => {
      await context.strapi.update("restaurants", 1, {
        username: "La Fourchette",
      });

      expect(
        context.axiosRequest.calledWithExactly({
          method: "put",
          url: "/restaurants/1",
          data: {
            username: "La Fourchette",
          },
        })
      ).toBe(true);
    });

    test("delete - Delete a {content-type} entry", async () => {
      await context.strapi.delete("restaurants", 1);

      expect(
        context.axiosRequest.calledWithExactly({
          method: "delete",
          url: "/restaurants/1",
        })
      ).toBe(true);
    });
  });

  describe("GraphQL", () => {
    test("GraphQL support", async () => {
      context.axiosRequest.resolves({
        data: {
          data: { restaurants: [{ name: "La Fourchette", description: "" }] },
        },
      });

      const response = await context.strapi.graphql({
        query: `query { restaurants { id name } }`,
      });

      expect(
        context.axiosRequest.calledWithExactly({
          method: "post",
          url: "/graphql",
          data: {
            query: `query { restaurants { id name } }`,
          },
        })
      ).toBe(true);

      expect(response).toEqual({
        data: [{ name: "La Fourchette", description: "" }],
      });
    });
  });
});
