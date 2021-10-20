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
import Strapi, { StrapiOptions } from 'strapi-sdk-js'

const options: StrapiOptions = {
  url: 'http://strapi-host/'
}

const strapi = new Strapi(options)
```

### `StrapiOptions`
- Options in order to configure [new Strapi SDK instance](getting-started/usage#new-instance).

```ts
interface StrapiConfig {
  url?: string;
  store?: StoreConfig;
  axiosOptions?: AxiosRequestConfig;
}
```

### `StoreConfig`
- Used for [store](options#store) configuration in [Strapi SDK instanciation](getting-started/usage#new-instance).

```ts
interface StoreConfig {
  key: string;
  useLocalStorage?: boolean;
  cookieOptions?: CookieAttributes;
}
```

### `StrapiBaseRequestParams`
<badge>v2.0.0+</badge>
- Strapi query filters used in [findOne](methods#findOne), [create](methods#create), [update](methods#update), [delete](methods#delete) methods.

```ts
interface StrapiBaseRequestParams {
  fields?: Array<string>;
  populate?: string | Array<string>;
}
```
> To know more about how to use it, see [Strapi REST API](https://github.com/strapi/rfcs/blob/v4/rest-api/rfcs/xxxx-v4-rest-api.md#retrieving-data)


### `StrapiRequestParams`
<badge>v2.0.0+</badge>
- Strapi query filters used in [find](methods#findOne) methods.

```ts
interface StrapiRequestParams extends StrapiBaseRequestParams {
  sort?: string | Array<string>;
  pagination?: PaginationByOffset | PaginationByPage;
  filters?: Record<string, unknown>;
  publicationState?: "live" | "preview";
  _locale?: StrapiLocale;
}
```
> To know more about how to use it, see [Strapi REST API](https://github.com/strapi/rfcs/blob/v4/rest-api/rfcs/xxxx-v4-rest-api.md#retrieving-data)


### `PaginationByPage`
<badge>v2.0.0+</badge>
- In Strapi v4, results can be paginated. Use the following types in [StrapiRequestParams](#StrapiRequestParams) in order to **paginate those results by page**.

```ts
interface PaginationByPage {
  page: number;
  pageSize: number;
  withCount?: boolean;
}
```

### `PaginationByOffset`
<badge>v2.0.0+</badge>
- In Strapi v4, results can be paginated. Use the following types in [StrapiRequestParams](#StrapiRequestParams) in order to **paginate those results by offset**.

```ts
export interface PaginationByOffset {
  start: number;
  limit: number;
  withCount?: boolean;
}
```

### `StrapiLocale`
<badge>v2.0.0+</badge>
- With this new version, we decided to give you access to all locales that are available in Strapi. This type is used in [StrapiRequestParams](#StrapiRequestParams) in order to **retrieve content by locale**.

```ts
export type StrapiLocale = | "af" | "af-NA" | "af-ZA" | "agq" ...
```
> See [full list of available locales](https://github.com/strapi/strapi/blob/master/packages/strapi-plugin-i18n/constants/iso-locales.json)

### `StrapiResponse<T>`
<badge>v2.0.0+</badge>
- With Strapi V4 comes a new response object. Now you will have access a `data` object (the response data itself) & one `meta` object (information about pagination, publication state, available locales, etc).

```ts
export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}
```
> To know more about how to use it, see [Strapi unified response format](https://github.com/strapi/rfcs/blob/v4/rest-api/rfcs/xxxx-v4-rest-api.md#fetching-entities)


### `StrapiAuthProvider`
- Used for `provider` parameter in [getProviderAuthenticationUrl](methods#getproviderauthenticationurlprovider) & [authenticateProvider](methods#authenticateproviderprovider-access_token) methods.

```ts
type StrapiAuthProvider = "github" | "facebook" | "google" | "cognito" | "twitter" | "discord" | "twitch" | "instagram" | "vk" | "linkedin" | "reddit" | "auth0";
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
