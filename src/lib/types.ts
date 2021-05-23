import type { AxiosRequestConfig } from "axios";

export interface StrapiContentType {
  name: string;
  type: "collection" | "single";
}

export interface StrapiOptions {
  url?: string;
  contentTypes?: string[] | StrapiContentType[];
  axiosOptions?: AxiosRequestConfig;
}
