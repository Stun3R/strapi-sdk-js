import type { AxiosRequestConfig } from "axios";
import type { CookieAttributes } from "js-cookie";

export type StrapiAuthProvider =
  | "github"
  | "facebook"
  | "google"
  | "cognito"
  | "twitter"
  | "discord"
  | "twitch"
  | "instagram"
  | "vk"
  | "linkedin"
  | "reddit"
  | "auth0";

export interface StoreConfig {
  key: string;
  useLocalStorage?: boolean;
  cookieOptions?: CookieAttributes;
}

export interface StrapiOptions {
  url?: string;
  prefix?: string;
  store?: StoreConfig;
  axiosOptions?: AxiosRequestConfig;
}

export interface StrapiDefaultOptions {
  url: string;
  prefix: string;
  store: StoreConfig;
  axiosOptions: AxiosRequestConfig;
}

export type StrapiUser = Record<string, unknown> | null;

export interface PaginationByPage {
  page: number;
  pageSize: number;
  withCount?: boolean;
}

export interface PaginationByOffset {
  start: number;
  limit: number;
  withCount?: boolean;
}

export interface StrapiBaseRequestParams {
  fields?: Array<string>;
  populate?: string | Array<string>;
}

export interface StrapiRequestParams extends StrapiBaseRequestParams {
  sort?: string | Array<string>;
  pagination?: PaginationByOffset | PaginationByPage;
  filters?: Record<string, unknown>;
  publicationState?: "live" | "preview";
}

export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiAuthenticationResponse {
  user: Record<string, unknown>;
  jwt: string;
}

export interface StrapiAuthenticationData {
  identifier: string;
  password: string;
}

export interface StrapiRegistrationData {
  username: string;
  email: string;
  password: string;
}

export interface StrapiForgotPasswordData {
  email: string;
}

export interface StrapiResetPasswordData {
  code: string;
  password: string;
  passwordConfirmation: string;
}

export interface StrapiEmailConfirmationData {
  email: string;
}
