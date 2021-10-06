---
title: Usage
subtitle: "Learn how to use this SDK. 📚"
description: "Learn how to use this SDK. 📚"
position: 3
category: "🚀 Getting Started"
---

## New instance

Here is how you can instantiate the Strapi SDK. ***Note that the displayed options are the default ones.*** 😉

```js
import Strapi from "strapi-sdk-js"

const strapi = new Strapi()
// OR with options
const strapi = new Strapi({
  url: process.env.STRAPI_URL || "http://localhost:1337",
  prefix: '/api' // only works in v2
  store: {
    key: "strapi_jwt",
    useLocalStorage: false,
    cookieOptions: { path: "/" },
  },
  axiosOptions: {},
})
```

> See [options](/api/options) for available options.

## Content Types

All contentTypes methods are built around the default Strapi CRUD operations.

- `find`
- `findOne`
- `count`
- `create`
- `update`
- `delete`

```js
await strapi.find("restaurants", { ...params })
```

> See more in [Methods](/api/methods)

## GraphQL
<alert type="info">

This method is only available in **v1**.

</alert>
  
Good news! You can do GraphQL queries through this SDK 🥳

```js
await strapi.graphql({
  query: `query Restaurants {
    restaurants {
      id
      name
    }
  }`
})
```

> See more in [Methods#graphql](/api/methods#graphqlquery)

## Authentication

Here are the methods in order to handle authentication in your application:

### Register
```js
const { user, jwt } = await strapi.register({ email: '', username: '', password: '' })
```

### Login
```js
const { user, jwt } = await strapi.login({ identifier: '', password: '' })
```

### Logout
```js
strapi.logout()
```

### Forgot Password
```js
await strapi.forgotPassword({ email: '' })
```

### Reset Password
```js
const { user, jwt } = await strapi.resetPassword({ code: '', password: '', passwordConfirmation: '' })
```

### Email Confirmation
```js
await strapi.sendEmailConfirmation({ email: '' })
```

### Get Auth Provider URL
```js
window.location = strapi.getAuthenticationProvider('provider');
```
> See [providers list](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#providers)

### Authenticate Provider
```js
await strapi.authenticateProvider('provider', 'access_token')
// OR with params query
await strapi.authenticateProvider('provider')
```
> See [providers list](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#providers)

## User

Once you're logged in, you can access the `user` object which contains details about authenticated user:
```js
strapi.user
``` 

## Advanced

### Accessing axios

This SDK uses `axios` under the hood, you can access the `axios` instance directly from there:

```js
strapi.axios
```

OR if you defined custom routes in your Strapi API that go out of the REST scope or if you want to extend the `axios request config`, you can do as below::

```js
const response = await strapi.request('get', '/restaurants', {
  headers: {
    foo: 'bar',
  },
})
```

> See the [axios config](https://github.com/axios/axios#request-config)