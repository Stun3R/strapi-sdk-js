---
title: Usage
description: "Learn how to use this SDK. 📚"
position: 3
category: "🚀 Getting Started"
---

## New instance

Here is how you can instanciate the Strapi SDK. ***Note that the displayed options are the defaults one.*** 😉

```js
import Strapi from "strapi-sdk"

const strapi = new Strapi()
// OR with options
const strapi = new Strapi({
  url: process.env.STRAPI_URL || "http://localhost:1337",
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

### Extend Axios

If you defined custom routes in your Strapi API that goes out of the REST scope, you can use the `request` method:

```js
const response = await strapi.request('get', '/my-custom-route', {
  params: {
    _sort: 'name:ASC',
  },
})
```

OR if you want to extend the axios request config (a custom header per example), you can do it with the same `request` method:

```js
const response = await strapi.request('get', '/restaurants', {
  headers: {
    foo: 'bar',
  },
})
```

> See the [axios config](https://github.com/axios/axios#request-config)