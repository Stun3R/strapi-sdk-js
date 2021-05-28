import type { AxiosRequestConfig } from "axios";
import type { CookieAttributes } from "js-cookie";

export type StrapiAuthenticationProvider =
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

export interface StrapiContentType {
  name: string;
  type: "collection" | "single";
}

export interface StoreConfig {
  key: string;
  useLocalStorage?: boolean;
  httpOnly?: boolean;
  cookieOptions?: CookieAttributes;
}

export interface StrapiOptions {
  url?: string;
  contentTypes?: string[] | StrapiContentType[];
  store?: StoreConfig;
  axiosOptions?: AxiosRequestConfig;
}

export interface StrapiDefaultOptions {
  url: string;
  contentTypes: string[] | StrapiContentType[];
  store: StoreConfig;
  axiosOptions: AxiosRequestConfig;
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
