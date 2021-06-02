import Strapi from "../../src";
import sinon from "sinon";
import Cookies from "js-cookie";

interface TestContext {
  strapi: Strapi;
  axiosRequest: sinon.SinonStub;
}

describe("Strapi SDK", () => {
  let context: TestContext;

  beforeEach(() => {
    const strapi = new Strapi({
      url: "http://strapi-host/",
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
        status: "400",
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
        status: "400",
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
        status: "400",
        message: "Strapi error",
        original: { message: "Strapi error" },
      });
    });
  });

  test("Catch Network error request", async () => {
    context.axiosRequest.rejects(new Error("Network Error"));

    let response;
    try {
      await context.strapi.request("get", "/users");
    } catch (error) {
      response = error;
    }

    expect(response).toMatchObject({
      message: "Network Error",
      original: response.original,
      status: 500,
    });
  });

  describe("Users & Permissions", () => {
    test("Register", async () => {
      context.axiosRequest.resolves({
        data: {
          user: {},
          jwt: "XXX",
        },
      });

      const response = await context.strapi.register({
        email: "john@doe.com",
        username: "John Doe",
        password: "password",
      });

      expect(
        context.axiosRequest.calledWith({
          method: "post",
          url: "/auth/local/register",
          data: {
            email: "john@doe.com",
            username: "John Doe",
            password: "password",
          },
        })
      ).toBe(true);

      expect(response).toEqual({ user: {}, jwt: "XXX" });

      expect(
        context.strapi.axios.defaults.headers.common["Authorization"]
      ).toBe("Bearer XXX");

      delete context.strapi.axios.defaults.headers.common["Authorization"];
      Cookies.remove("strapi_jwt");
    });

    test("Login", async () => {
      context.axiosRequest.resolves({
        data: {
          user: {},
          jwt: "XXX",
        },
      });

      const response = await context.strapi.login({
        identifier: "john@doe.com",
        password: "password",
      });

      expect(
        context.axiosRequest.calledWith({
          method: "post",
          url: "/auth/local",
          data: {
            identifier: "john@doe.com",
            password: "password",
          },
        })
      ).toBe(true);

      expect(response).toEqual({ user: {}, jwt: "XXX" });
      expect(
        context.strapi.axios.defaults.headers.common["Authorization"]
      ).toBe("Bearer XXX");

      delete context.strapi.axios.defaults.headers.common["Authorization"];
      Cookies.remove("strapi_jwt");
    });

    test("Forgot Password", async () => {
      await context.strapi.forgotPassword({
        email: "john@doe.com",
      });

      expect(
        context.axiosRequest.calledWith({
          method: "post",
          url: "/auth/forgot-password",
          data: {
            email: "john@doe.com",
          },
        })
      ).toBe(true);
    });

    test("Reset Password", async () => {
      context.axiosRequest.resolves({
        data: {
          user: {},
          jwt: "XXX",
        },
      });

      const response = await context.strapi.resetPassword({
        code: "XXX",
        password: "password",
        passwordConfirmation: "password",
      });

      expect(
        context.axiosRequest.calledWith({
          method: "post",
          url: "/auth/reset-password",
          data: {
            code: "XXX",
            password: "password",
            passwordConfirmation: "password",
          },
        })
      ).toBe(true);

      expect(response).toEqual({ user: {}, jwt: "XXX" });

      expect(
        context.strapi.axios.defaults.headers.common["Authorization"]
      ).toBe("Bearer XXX");

      delete context.strapi.axios.defaults.headers.common["Authorization"];
      Cookies.remove("strapi_jwt");
    });

    test("Send Email Confirmation", async () => {
      await context.strapi.sendEmailConfirmation({
        email: "john@doe.com",
      });

      expect(
        context.axiosRequest.calledWith({
          method: "post",
          url: "/auth/send-email-confirmation",
          data: {
            email: "john@doe.com",
          },
        })
      ).toBe(true);
    });

    test("Get Authentication Provider", () => {
      const url = context.strapi.getAuthenticationProvider("github");

      expect(url).toBe("http://strapi-host/connect/github");
    });

    test("Authentication with third party token", async () => {
      context.axiosRequest.resolves({
        data: {
          user: {},
          jwt: "XXX",
        },
      });

      const response = await context.strapi.authenticateProvider(
        "github",
        "myAccessToken"
      );

      expect(
        context.axiosRequest.calledWith({
          method: "get",
          url: "/auth/github/callback",
          params: {
            access_token: "myAccessToken",
          },
        })
      ).toBe(true);

      expect(response).toEqual({ user: {}, jwt: "XXX" });
      expect(
        context.strapi.axios.defaults.headers.common["Authorization"]
      ).toBe("Bearer XXX");

      delete context.strapi.axios.defaults.headers.common["Authorization"];
      Cookies.remove("strapi_jwt");
    });

    test("Authentication with third party token on searchParams", async () => {
      Object.defineProperty(window, "location", {
        value: {
          search: "?access_token=myAccessToken",
        },
      });

      context.axiosRequest.resolves({
        data: {
          user: {},
          jwt: "XXX",
        },
      });

      const response = await context.strapi.authenticateProvider("github");

      expect(
        context.axiosRequest.calledWith({
          method: "get",
          url: "/auth/github/callback",
          params: {
            access_token: "myAccessToken",
          },
        })
      ).toBe(true);

      expect(response).toEqual({ user: {}, jwt: "XXX" });
      expect(
        context.strapi.axios.defaults.headers.common["Authorization"]
      ).toBe("Bearer XXX");

      delete context.strapi.axios.defaults.headers.common["Authorization"];
      Cookies.remove("strapi_jwt");
    });

    test("Logout", async () => {
      context.axiosRequest.resolves({
        data: {
          user: {},
          jwt: "XXX",
        },
      });

      await context.strapi.login({
        identifier: "john@doe.com",
        password: "password",
      });

      expect(
        context.strapi.axios.defaults.headers.common["Authorization"]
      ).toBe("Bearer XXX");

      context.strapi.logout();

      expect(
        context.strapi.axios.defaults.headers.common["Authorization"]
      ).toBe(undefined);
    });
  });

  describe("Token Management", () => {
    test("Set Token in Cookies", () => {
      context.strapi.setToken("XXX");

      expect(
        context.strapi.axios.defaults.headers.common["Authorization"]
      ).toBe("Bearer XXX");

      expect(Cookies.get("strapi_jwt")).toBe("XXX");

      delete context.strapi.axios.defaults.headers.common["Authorization"];
      Cookies.remove("strapi_jwt");
    });

    test("Set Token in localStorage", () => {
      context.strapi.options.store.useLocalStorage = true;
      context.strapi.setToken("XXX");

      expect(
        context.strapi.axios.defaults.headers.common["Authorization"]
      ).toBe("Bearer XXX");

      expect(window.localStorage.getItem("strapi_jwt")).toBe("XXX");

      delete context.strapi.axios.defaults.headers.common["Authorization"];
      window.localStorage.removeItem("strapi_jwt");
      context.strapi.options.store.useLocalStorage = false;
    });

    test("Remove Token in Cookies", () => {
      context.strapi.setToken("XXX");
      context.strapi.removeToken();

      expect(
        context.strapi.axios.defaults.headers.common["Authorization"]
      ).toBe(undefined);

      expect(Cookies.get("strapi_jwt")).toBe(undefined);
    });

    test("Remove Token in localStorage", () => {
      context.strapi.options.store.useLocalStorage = true;
      context.strapi.setToken("XXX");
      context.strapi.removeToken();

      expect(
        context.strapi.axios.defaults.headers.common["Authorization"]
      ).toBe(undefined);

      expect(window.localStorage.getItem("strapi_jwt")).toBe(null);
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

      expect(response).toEqual([{ name: "La Fourchette", description: "" }]);
    });
  });
});
