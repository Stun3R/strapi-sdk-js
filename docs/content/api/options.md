---
title: Options
description: "Learn how to configure your Strapi SDK. 🖥"
position: 6
category: "🖥 API"
---

## `url`
- Type: `string`
- Default: `process.env.STRAPI_URL || http://localhost:1337`

URL of the Strapi server.

Environment variable `STRAPI_URL` can be used to override `url`.


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
import Strapi from 'strapi-sdk'

const strapi = new Strapi({
  store: {
    key: "strapi_jwt",
    useLocalStorage: false,
    cookieOptions: { path: "/" },
  },
})
```

## `axiosOptions`
- Type: `AxiosRequestConfig`
- Default: `{}`

Options to forward to the [Axios instance](https://github.com/axios/axios#request-config)