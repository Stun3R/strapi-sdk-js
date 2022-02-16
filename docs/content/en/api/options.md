---
title: Options
subtitle: "Learn how to configure your Strapi SDK. 🖥"
description: "Learn how to configure your Strapi SDK. 🖥"
position: 6
category: "🖥 API"
---

## `url`

- Type: `string`
- Default: `process.env.STRAPI_URL || http://localhost:1337`

URL of the Strapi server.

Environment variable `STRAPI_URL` can be used to override `url`.

<alert type="warning">

Since **v2.1.4** `process.env.STRAPI_URL` is not taken by default.

</alert>

## `prefix`

- Type: `string`
- Default: `/api`

In **Strapi v4** you are able to change the prefix of API endpoint. By default it is `/api` in order to request your API on `http://localhost:1337/api` but you can configure depends on your needs.

> To see how to configure it on Strapi, see [API configuration](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/api.html#api-configuration)

## `store`

- Type: `StoreConfig`

Store's configuration in order to set `key` for the cookie name as well as localStorage key if you choose to use it thanks `useLocalStorage`. Finally you can give some `cookieOptions` to forward to the [js-cookie](https://github.com/jshttp/cookie#options-1) package.

- `key`
  - Type: `string`
  - Default: `strapi_jwt`
- `useLocalStorage`
  - Type: `boolean`
  - Default: `false`
- `cookieOptions`
  - Type: `object`
  - Default: `{ path: "/" }`

**Example**

```js
import Strapi from "strapi-sdk-js";

const strapi = new Strapi({
  store: {
    key: "strapi_jwt",
    useLocalStorage: false,
    cookieOptions: { path: "/" },
  },
});
```

## `axiosOptions`

- Type: `AxiosRequestConfig`
- Default: `{}`

Options to forward to the [Axios instance](https://github.com/axios/axios#request-config)
