// Module dependencies & types
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import defu from "defu";
import qs from "qs";
import Cookies from "js-cookie";

// Load custom types
import type {
  StrapiAuthenticationData,
  StrapiAuthenticationResponse,
  StrapiAuthenticationProvider,
  StrapiDefaultOptions,
  StrapiEmailConfirmationData,
  StrapiForgotPasswordData,
  StrapiOptions,
  StrapiRegistrationData,
  StrapiResetPasswordData,
} from "./types";

// Load utils methods
import { isBrowser } from "./utils";

// Strapi options' default values
const defaults: StrapiDefaultOptions = {
  url: process.env.STRAPI_URL || "http://localhost:1337",
  contentTypes: [],
  store: {
    key: "strapi_jwt",
    httpOnly: false,
    useLocalStorage: false,
    cookieOptions: { path: "/" },
  },
  axiosOptions: {},
};

export default class Strapi {
  public axios: AxiosInstance;
  public options: StrapiDefaultOptions;

  /**
   * Strapi SDK Constructor
   *
   * @constructor
   * @param {StrapiOptions} options? - Options in order to configure API URL, list your Content Types & extend the axios configuration
   * @param {string} options.url? - Your Strapi API URL, Default: process.env.STRAPI_URL || http://localhost::1337
   * @param {string[] | StrapiContentType[]} options.contentTypes? - The list of your Content type on your Strapi API
   * @param {StoreConfig} options.store? - Config the way you want to store JWT (Cookie or LocalStorage)
   * @param {AxiosRequestConfig} options.axiosOptions? - The list of your Content type on your Strapi API
   */
  constructor(options?: StrapiOptions) {
    // merge given options with default values
    this.options = defu((options as StrapiDefaultOptions) || {}, defaults);

    // create axios instance
    this.axios = axios.create({
      baseURL: this.options.url,
      paramsSerializer: qs.stringify,
      ...this.options.axiosOptions,
    });

    // Generate shortcuts methods
    for (let contentType of this.options.contentTypes) {
      let type: "collection" | "single" = "collection";
      let key: string;
      if (typeof contentType === "object") {
        key = contentType.name;
        type = contentType.type;
        contentType = contentType.name;
      } else {
        key = contentType;
        type = "collection";
      }

      if (Strapi.prototype.hasOwnProperty(key)) return;

      Object.defineProperty(Strapi.prototype, key, {
        get() {
          const self = this;
          return {
            single: {
              find(...args: never[]) {
                return self.find(contentType, ...args);
              },
              update(...args: never[]) {
                return self.update(contentType, ...args);
              },
              delete(...args: never[]) {
                return self.delete(contentType, ...args);
              },
            },
            collection: {
              find(...args: never[]) {
                return self.find(contentType, ...args);
              },
              findOne(...args: never[]) {
                return self.findOne(contentType, ...args);
              },
              count(...args: never[]) {
                return self.count(contentType, ...args);
              },
              create(...args: never[]) {
                return self.create(contentType, ...args);
              },
              update(...args: never[]) {
                return self.update(contentType, ...args);
              },
              delete(...args: never[]) {
                return self.delete(contentType, ...args);
              },
            },
          }[type];
        },
      });
    }

    // Synchronize token if already exist
    this.syncToken();
  }

  /**
   * Basic axios request
   *
   * @param  {Method} method - HTTP method
   * @param  {string} url - Custom or Strapi API URL
   * @param  {AxiosRequestConfig} axiosConfig? - Custom Axios config
   * @returns Promise<AxiosResponse<T>>
   */
  public async request<T>(
    method: Method,
    url: string,
    axiosConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axios.request<T>({
        method,
        url,
        ...axiosConfig,
      });
      return response;
    } catch (error) {
      // Strapi error or not
      if (!error.response) {
        throw {
          isStrapi: false,
          response: error.message,
        };
      } else {
        const {
          status,
          statusText,
          headers,
          config,
          request,
          data,
        }: AxiosResponse = error.response;

        // format error message
        let message;
        if (Array.isArray(data.message)) {
          if (data.message[0].hasOwnProperty("messages")) {
            message = data.message[0].messages[0];
          } else {
            message = data.message[0];
          }
        } else {
          message = data.message;
        }

        throw {
          isStrapi: true,
          response: {
            status,
            statusText,
            message,
            original: data,
            headers,
            config,
            request,
          },
        };
      }
    }
  }
  /**
   * Authenticate user & retrieve his JWT
   *
   * @param  {StrapiAuthenticationData} data - User authentication form data: `identifier`, `password`
   * @param  {string} data.identifier - The email or username of the user
   * @param  {string} data.password - The password of the user
   * @returns Promise<StrapiAuthenticationResponse>
   */
  public async login(
    data: StrapiAuthenticationData
  ): Promise<StrapiAuthenticationResponse> {
    this.removeToken();
    const {
      data: { user, jwt },
    }: AxiosResponse<StrapiAuthenticationResponse> = await this.request<StrapiAuthenticationResponse>(
      "post",
      "/auth/local",
      {
        data,
      }
    );
    this.setToken(jwt);
    return { user, jwt };
  }

  /**
   * Register a new user & retrieve JWT
   *
   * @param  {StrapiRegistrationData} data - New user registration data: `username`, `email`, `password`
   * @param  {string} data.username - Username of the new user
   * @param  {string} data.email - Email of the new user
   * @param  {string} data.password - Password of the new user
   * @returns Promise<StrapiAuthenticationResponse>
   */
  public async register(
    data: StrapiRegistrationData
  ): Promise<StrapiAuthenticationResponse> {
    this.removeToken();
    const {
      data: { user, jwt },
    }: AxiosResponse<StrapiAuthenticationResponse> = await this.request<StrapiAuthenticationResponse>(
      "post",
      "/auth/local/register",
      {
        data,
      }
    );
    this.setToken(jwt);
    return { user, jwt };
  }

  /**
   * Send an email to a user in order to reset his password
   *
   * @param  {StrapiForgotPasswordData} data - Forgot password data: `email`
   * @param  {string} data.email - Email of the user who forgot his password
   * @returns Promise<AxiosResponse>
   */
  public async forgotPassword(
    data: StrapiForgotPasswordData
  ): Promise<AxiosResponse> {
    this.removeToken();
    return this.request("post", "/auth/forgot-password", { data });
  }

  /**
   * Reset the user password
   *
   * @param  {StrapiResetPasswordData} data - Reset password data object: `code`, `password`, `passwordConfirmation`
   * @param  {string} data.code - Code received by email after calling the `forgotPassword` method
   * @param  {string} data.password - New password of the user
   * @param  {string} data.passwordConfirmation - Confirmation of the new password of the user
   * @returns Promise<StrapiAuthenticationResponse>
   */
  public async resetPassword(
    data: StrapiResetPasswordData
  ): Promise<StrapiAuthenticationResponse> {
    this.removeToken();
    const {
      data: { user, jwt },
    }: AxiosResponse<StrapiAuthenticationResponse> = await this.request(
      "post",
      "/auth/reset-password",
      {
        data,
      }
    );
    this.setToken(jwt);
    return { user, jwt };
  }

  /**
   * Send programmatically an email to a user in order to confirm his account
   *
   * @param  {StrapiEmailConfirmationData} data - Email confirmation data: `email`
   * @param  {string} data.email - Email of the user who want to be confirmed
   * @returns Promise<AxiosResponse>
   */
  public async sendEmailConfirmation(
    data: StrapiEmailConfirmationData
  ): Promise<AxiosResponse> {
    return this.request("post", "/auth/send-email-confirmation", {
      data,
    });
  }
  /**
   * Get the correct URL to authenticate with provider
   *
   * @param  {StrapiAuthenticationProvider} provider - Provider name
   * @returns string
   */
  public getAuthenticationProvider(
    provider: StrapiAuthenticationProvider
  ): string {
    return new URL(`/connect/${provider}`, this.options.url).href;
  }

  /**
   * Authenticate user with the token present on the URL or in `params`
   *
   * @param  {StrapiAuthenticationProvider} provider - Provider name
   * @param  {string} access_token? - Access Token return from Strapi
   * @returns Promise<StrapiAuthenticationResponse>
   */
  public async authenticateProvider(
    provider: StrapiAuthenticationProvider,
    access_token?: string
  ): Promise<StrapiAuthenticationResponse> {
    this.removeToken();
    if (isBrowser()) {
      const params = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
      });
      if (params.access_token) access_token = params.access_token as string;
    }
    const {
      data: { user, jwt },
    }: AxiosResponse<StrapiAuthenticationResponse> = await this.request(
      "get",
      `/auth/${provider}/callback`,
      {
        params: { access_token },
      }
    );
    this.setToken(jwt);
    return { user, jwt };
  }

  /**
   * Logout by removing authentication token
   *
   * @returns void
   */
  public logout(): void {
    this.removeToken();
  }

  /**
   * Get a list of {content-type} entries
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {AxiosRequestConfig["params"]} params? - Filter and order queries
   * @returns Promise<AxiosResponse<T>>
   */
  public find<T>(
    contentType: string,
    params?: AxiosRequestConfig["params"]
  ): Promise<AxiosResponse<T>> {
    return this.request<T>("get", `/${contentType}`, { params });
  }

  /**
   * Get a specific {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry
   * @returns Promise<AxiosResponse<T>>
   */
  public findOne<T>(
    contentType: string,
    id: string | number
  ): Promise<AxiosResponse<T>> {
    return this.request<T>("get", `/${contentType}/${id}`);
  }

  /**
   * Count {content-type} entries
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {AxiosRequestConfig["params"]} params? - Filter and order queries
   * @returns Promise<AxiosResponse<T>>
   */
  public count<T>(
    contentType: string,
    params?: AxiosRequestConfig["params"]
  ): Promise<AxiosResponse<T>> {
    return this.request<T>("get", `/${contentType}/count`, { params });
  }

  /**
   * Create a {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {AxiosRequestConfig["data"]} data - New entry
   * @returns Promise<AxiosResponse<T>>
   */
  public create<T>(
    contentType: string,
    data: AxiosRequestConfig["data"]
  ): Promise<AxiosResponse<T>> {
    return this.request<T>("post", `/${contentType}`, { data });
  }

  /**
   * Update a specific entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry to be updated
   * @param  {AxiosRequestConfig["data"]} data - New entry data
   * @returns Promise<AxiosResponse<T>>
   */
  public update<T>(
    contentType: string,
    id: string | number,
    data: AxiosRequestConfig["data"]
  ): Promise<AxiosResponse<T>> {
    return this.request<T>("put", `/${contentType}/${id}`, { data });
  }

  /**
   * Delete en entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {string|number} id - ID of entry to be deleted
   * @returns Promise<AxiosResponse<T>>
   */
  public delete<T>(
    contentType: string,
    id: string | number
  ): Promise<AxiosResponse<T>> {
    return this.request<T>("delete", `/${contentType}/${id}`);
  }

  /**
   * Fetch Strapi API through graphQL
   *
   * @param  {AxiosRequestConfig["data"]} query - GraphQL Query
   * @returns Promise<AxiosResponse<T>>
   */
  public async graphql<T>(
    query: AxiosRequestConfig["data"]
  ): Promise<AxiosResponse<T>> {
    const response: AxiosResponse = await this.request("post", "/graphql", {
      data: query,
    });
    response.data = Object.values(response.data.data)[0];
    return response;
  }

  /**
   * Sync token between storage & header when SDK is instanciate
   *
   * @returns void
   */
  private syncToken(): void {
    const { useLocalStorage, key } = this.options.store;
    if (isBrowser()) {
      const token = useLocalStorage
        ? window.localStorage.getItem(key)
        : Cookies.get(key);

      if (token) {
        this.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }
  }
  /**
   * Set token in Axios headers & in choosen storage
   *
   * @param  {string} token - Token retrieve from login or register method
   * @returns void
   */
  public setToken(token: string): void {
    const { useLocalStorage, key, cookieOptions } = this.options.store;
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    if (isBrowser()) {
      useLocalStorage
        ? window.localStorage.setItem(key, token)
        : Cookies.set(key, token, cookieOptions);
    }
  }
  /**
   * Remove token in Axios headers & in choosen storage (Cookies or Local)
   *
   * @returns void
   */
  public removeToken(): void {
    const { useLocalStorage, key } = this.options.store;
    delete this.axios.defaults.headers.common["Authorization"];
    if (isBrowser()) {
      useLocalStorage
        ? window.localStorage.removeItem(key)
        : Cookies.remove(key);
    }
  }
}
