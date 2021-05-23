// Module dependencies & types
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import defu from "defu";
import qs from "qs";

// Load custom types
import type { StrapiOptions } from "./types";

// Strapi options' default values
const defaults: StrapiOptions = {
  url: process.env.STRAPI_URL || "http://localhost:1337",
  contentTypes: [],
  axiosOptions: {},
};

export default class Strapi {
  public axios: AxiosInstance;
  public options: StrapiOptions;

  /**
   * Strapi SDK Constructor
   *
   * @param {StrapiOptions} options? - Options in order to configure API URL, list your Content Types & extend the axios configuration
   * @param {string} options.url? - Your Strapi API URL, Default: process.env.STRAPI_URL || http://localhost::1337
   * @param {string[] | StrapiContentType[]} options.contentTypes? - The list of your Content type on your Strapi API
   * @param {AxiosRequestConfig} options.axiosOptions? - The list of your Content type on your Strapi API
   */
  constructor(options?: StrapiOptions) {
    // merge given options with default values
    this.options = defu(options || {}, defaults);

    // create axios instance
    this.axios = axios.create({
      baseURL: this.options.url,
      paramsSerializer: qs.stringify,
      ...this.options.axiosOptions,
    });

    // Generate scoped methods for
    for (let contentType of this.options.contentTypes || []) {
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
}
