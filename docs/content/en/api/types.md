---
title: Types
subtitle: "Because this package has been designed using Typescript, it natively supports it. 🖥"
description: "Because this package has been designed using Typescript, it natively supports it. 🖥"
position: 7
category: "🖥 API"
---

## Axios

Here is the list of all `axios` interfaces & types used in this package:

- `AxiosInstance` used for the `strapi.axios` property
- `AxiosRequestConfig` used for the [axiosOptions](options#axiosoptions) in the `Strapi Constructor` and the custom request
- `Method` (which is a `type`) used for the parameter `method` in the custom [request method](methods#request).

## Custom

Here is a list of all the custom types & interfaces present in this package.

You can easily use them by importing them.

**Example with `StrapiOptions`**

```ts
import Strapi, { StrapiOptions } from "strapi-sdk-js";

const options: StrapiOptions = {
  url: "http://strapi-host/",
};

const strapi = new Strapi(options);
```

### `StrapiOptions`

- Options in order to configure [new Strapi SDK instance](/guide/usage#new-instance).

```ts
interface StrapiConfig {
  url?: string;
  store?: StoreConfig;
  axiosOptions?: AxiosRequestConfig;
}
```

### `StoreConfig`

- Used for [store](options#store) configuration in [Strapi SDK instanciation](/guide/usage#new-instance).

```ts
interface StoreConfig {
  key: string;
  useLocalStorage?: boolean;
  cookieOptions?: CookieAttributes;
}
```

### `StrapiAuthProvider`

- Used for `provider` parameter in [getProviderAuthenticationUrl](methods#getproviderauthenticationurlprovider) & [authenticateProvider](methods#authenticateproviderprovider-access_token) methods.

```ts
type StrapiAuthProvider =
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
```

### `StrapiAuthenticationResponse`

- Return object type in [register](methods#registerdata), [login](methods#logindata), [resetPassword](methods#resetpassworddata) & [authenticateProvider](methods#authenticateproviderprovider-access_token) methods.

```ts
interface StrapiAuthenticationResponse {
  user: Record<string, unknown>;
  jwt: string;
}
```

### `StrapiAuthenticationData`

- Used for `data` parameter in [login](methods#logindata) method.

```ts
interface StrapiAuthenticationData {
  identifier: string;
  password: string;
}
```

### `StrapiRegistrationData`

- Used for `data` parameter in [register](methods#registerdata) method.

```ts
interface StrapiRegistrationData {
  username: string;
  email: string;
  password: string;
}
```

### `StrapiForgotPasswordData`

- Used for `data` parameter in [forgotPassword](methods#forgotpassworddata) method.

```ts
interface StrapiForgotPasswordData {
  email: string;
}
```

### `StrapiResetPasswordData`

- Used for `data` parameter in [resetPassword](methods#resetpassworddata) method.

```ts
interface StrapiResetPasswordData {
  code: string;
  password: string;
  passwordConfirmation: string;
}
```

### `StrapiEmailConfirmationData`

- Used for `data` parameter in [sendEmailConfirmation](methods#sendemailconfirmationdata) method.

```ts
interface StrapiEmailConfirmationData {
  email: string;
}
```
