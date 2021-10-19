---
title: Methods
description: "Discover how to use this beautiful SDK. 🖥"
position: 5
category: "🖥 API"
---


### `find(contentType, params)`
- Returns `Promise<T>`

Get a list of content type entries matching the query filters. You can read [here](https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#api-parameters) for available parameters.
```js
await strapi.find('restaurants', { name: 'La Fourchette' })
```

### `findOne(contentType, id)`
- Returns `Promise<T>`

Get a specific content type entry by id.
```js
await strapi.findOne('restaurants', 1)
```

### `count(contentType, params)`
- Returns `Promise<T>`

Count content type entries matching the query filters. You can read [here](https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#api-parameters) for available parameters.
```js
await strapi.findOne('restaurants', 1)
```

### `create(contentType, data)`
- Returns `Promise<T>`

Create a content type entry and returns its value.
```js
await strapi.create('restaurants', { name: '' })
```

### `update(contentType, id, data)`
- Returns `Promise<T>`

Update a content type entry by id. It returns the updated entry.
```js
await strapi.update('restaurants', 1, { name: '' })
```

### `delete(contentType, id)`
- Returns `Promise<T>`

Delete a content type entry by id. It returns the deleted entry.
```js
await strapi.delete('restaurants', 1)
```

### `graphql(query)`
- Return `Promise<T>`

Perform GraphQL request throught `axios POST request`

<d-code-group>
  <d-code-block label="Directly in methods" active>

  ```js

  await strapi.graphql({
    query: `query {
      restaurants {
        id
        name
      }
    }`
  });
  ```

  </d-code-block>
  <d-code-block label="With graphql-tag">

  ```js{}[restaurants.js]
  import gql from "graphql-tag";

  export function findRestaurants() {
    const query = gql`
      query {
        restaurants {
          id
          name
        }
      }`;
    return query.loc.source.body;
  }
  ```

  ```js
  import { findRestaurants } from 'restaurants.js'

  await strapi.graphql({
    query: findRestaurants()
  })
  ```


  </d-code-block>
</d-code-group>

<d-alert type="warning">

This method is no longer supported in **v1.1.0 & newer** since it is better to use a true GraphQL client.

</d-alert>


### `register(data)`
- Returns `Promise<StrapiAuthenticationResponse>`

Register a new [User](methods#setuseruser) & sets the [Token](methods#settokentoken).
```js
await strapi.register({ username: '', email: '', password:'' })
```

> See the [Strapi documentation](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#registration).


### `login(data)`
- Returns `Promise<StrapiAuthenticationResponse>`

Authenticate a [User](methods#setuseruser) & sets the [Token](methods#settokentoken).
```js
await strapi.login({ identifier: '', password:'' })
```

> See the [Strapi documentation](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#login).


### `forgotPassword(data)`
- Returns `Promise<void>`

Send an email to a user in order to reset his password.
```js
await strapi.forgotPassword({ email: '' })
```

> See the [Strapi documentation](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#forgotten-reset-password).


### `resetPassword(data)`
- Returns `Promise<StrapiAuthenticationResponse>`

Reset the user password & sets the [Token](methods#settokentoken)
```js
await strapi.resetPassword({ code: '', password: '', passwordConfirmation: '' })
```

> See the [Strapi documentation](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#forgotten-reset-password).


### `sendEmailConfirmation(data)`
- Returns `Promise<void>`

Send programmatically an email to a user in order to confirm his account.
```js
await strapi.sendEmailConfirmation({ email: '' })
```

> See the [Strapi documentation](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#email-validation).


### `getProviderAuthenticationUrl(provider)`
- Returns `string`

Get the correct URL of the provider's authentication page to authenticate with it.
```js
strapi.getProviderAuthenticationUrl('provider')
```

> For the list of all providers, see [Strapi documentation](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#providers).


### `authenticateProvider(provider, access_token)`
- Returns `Promise<StrapiAuthenticationResponse>`

Once authorized, the provider will **redirects the user to your app with an access token in the URL**. The `access_token` parameter is not needed if you have it in your URL redirection but you can provide one.
```js
await strapi.authenticateProvider('provider')
// OR
await strapi.authenticateProvider('provider', 'myAccessToken')
```

> For the list of all providers, see [Strapi documentation](https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#providers).


### `logout()`

It will log out the user by removing authentication token from the [chosen storage](options#store) & `axios header`.
```js
strapi.logout()
```

### `setUser(user)`

Set local data of the logged-in user
```js
strapi.setUser(user)
```
<d-alert type="info">You can also use `strapi.user` in order to set user data and get it.</d-alert>


### `fetchUser()`
- Returns `Promise`

You often need to fetch your user data. Use this method to fetch the current user from `/users/me` if a `JWT` is present in your [storage](options#store). It sets the [User](methods#setuseruser).
```js
await strapi.fetchUser()
```

### `setToken(token)`

Set token in Axios headers as a `Bearer` JWT & store it in [chosen storage](options#store).
```js
strapi.setToken(token)
```


### `removeToken()`

Remove token from Axios headers & [chosen storage](options#store).
```js
strapi.removeToken()
```

## Extends

### axios

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