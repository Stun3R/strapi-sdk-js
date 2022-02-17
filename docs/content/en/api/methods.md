---
title: Methods
subtitle: "Discover how to use this beautiful SDK. 🖥"
description: "Discover how to use this beautiful SDK. 🖥"
position: 5
category: "🖥 API"
---

## CRUD

### `find(contentType, params)`

- Returns `Promise<StrapiResponse<T>>`

Get a list of content type entries matching the query filters. **Strapi v4** comes with brand new query filters, you can read more about it [here](https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#api-parameters) for available parameters.

```js
await strapi.find('restaurants', {
  filters: {
    name: {
      $eq: 'La Fourchette'
    }
  },
  sort: 'name:asc',
  pagination: {
    start: 0,
    limit: 0
  },
  fields: [...];
  populate: [...] || '' || {};
  publicationState: 'live';
  locale: 'all'
})
```

> To know more about query filters type, see [here](types#strapirequestparams)

### `findOne(contentType, id, params)`

- Returns `Promise<StrapiResponse<T>>`

Get a specific content type entry by id. You can add query filters in order to select the returning `fields` & `populate` relations.

```js
await strapi.findOne('restaurants', 1)
// with query filters
await strapi.findOne('restaurants', 1, {
  fields: ['id', 'name']
  populate: ['menu'],
})
```

> To know more about query filters type, see [here](types#strapibaserequestparams)

### `create(contentType, data, params)`

- Returns `Promise<StrapiResponse<T>>`

Create a content type entry and returns its value. You can add query filters in order to select the returning `fields` & `populate` relations.

```js
await strapi.create('restaurants', { name: '' })
// with query filters
await strapi.create('restaurants', 1, {
  fields: ['id', 'name']
  populate: ['menu'],
})
```

> To know more about query filters type, see [here](types#strapibaserequestparams)

### `update(contentType, id, data, params)`

- Returns `Promise<StrapiResponse<T>>`

Update a content type entry by id. It returns the updated entry. You can add query filters in order to select the returning `fields` & `populate` relations.

```js
await strapi.update('restaurants', 1, { name: '' })
// with query filters
await strapi.update('restaurants', 1, {
  fields: ['id', 'name']
  populate: ['menu'],
})
```

> To know more about query filters type, see [here](types#strapibaserequestparams)

### `delete(contentType, id, params)`

- Returns `Promise<StrapiResponse<T>>`

Delete a content type entry by id. It returns the deleted entry. You can add query filters in order to select the returning `fields` & `populate` relations.

```js
await strapi.delete('restaurants', 1)
// with query filters
await strapi.delete('restaurants', 1, {
  fields: ['id', 'name']
  populate: ['menu'],
})
```

> To know more about query filters type, see [here](types#strapibaserequestparams)

## Authentication

### `register(data)`

- Returns `Promise<StrapiAuthenticationResponse>`

Register a new [User](properties#user) & sets the [Token](methods#settokentoken).

```js
await strapi.register({ username: "", email: "", password: "" });
```

> See the [Strapi documentation](https://docs.strapi.io/developer-docs/latest/plugins/users-permissions.html#registration).

### `login(data)`

- Returns `Promise<StrapiAuthenticationResponse>`

Authenticate a [User](properties#user) & sets the [Token](methods#settokentoken).

```js
await strapi.login({ identifier: "", password: "" });
```

> See the [Strapi documentation](https://docs.strapi.io/developer-docs/latest/plugins/users-permissions.html#login).

### `forgotPassword(data)`

- Returns `Promise<void>`

Send an email to a user in order to reset his password.

```js
await strapi.forgotPassword({ email: "" });
```

> See the [Strapi documentation](https://docs.strapi.io/developer-docs/latest/plugins/users-permissions.html#forgotten-reset-password).

### `resetPassword(data)`

- Returns `Promise<StrapiAuthenticationResponse>`

Reset the user password & sets the [Token](methods#settokentoken)

```js
await strapi.resetPassword({
  code: "",
  password: "",
  passwordConfirmation: "",
});
```

> See the [Strapi documentation](https://docs.strapi.io/developer-docs/latest/plugins/users-permissions.html#forgotten-reset-password).

### `sendEmailConfirmation(data)`

- Returns `Promise<void>`

Send programmatically an email to a user in order to confirm his account.

```js
await strapi.sendEmailConfirmation({ email: "" });
```

> See the [Strapi documentation](https://docs.strapi.io/developer-docs/latest/plugins/users-permissions.html#email-validation).

### `getProviderAuthenticationUrl(provider)`

- Returns `string`

Get the correct URL of the provider's authentication page to authenticate with it.

```js
strapi.getProviderAuthenticationUrl("provider");
```

> For the list of all providers, see [Strapi documentation](https://docs.strapi.io/developer-docs/latest/plugins/users-permissions.html#providers).

### `authenticateProvider(provider, access_token)`

- Returns `Promise<StrapiAuthenticationResponse>`

Once authorized, the provider will **redirects the user to your app with an access token in the URL**. The `access_token` parameter is not needed if you have it in your URL redirection but you can provide one.

```js
await strapi.authenticateProvider("provider");
// OR
await strapi.authenticateProvider("provider", "myAccessToken");
```

> For the list of all providers, see [Strapi documentation](https://docs.strapi.io/developer-docs/latest/plugins/users-permissions.html#providers).

### `logout()`

It will log out the user by removing authentication token from the [chosen storage](options#store) & `axios header`.

```js
strapi.logout();
```

### `setUser(user)`

Set local data of the logged-in user

```js
strapi.setUser(user);
```

<alert type="warning">

This method is no longer supported in **v2.2.0 & newer** since `getter` & `setter` for `user` properties has been removed.

</alert>

<alert type="info">You can use `strapi.user` in order to set user data and get it.</alert>

### `fetchUser()`

- Returns `Promise`

You often need to fetch your user data. Use this method to fetch the current user from `/users/me` if a `JWT` is present in your [storage](options#store). It sets the [User](properties#user).

```js
await strapi.fetchUser();
```

### `setToken(token)`

Set token in Axios headers as a `Bearer` JWT & store it in [chosen storage](options#store).

```js
strapi.setToken(token);
```

### `removeToken()`

Remove token from Axios headers & [chosen storage](options#store).

```js
strapi.removeToken();
```

## Extends

### axios

This SDK uses `axios` under the hood, you can access the `axios` instance directly from there:

```js
strapi.axios;
```

OR if you defined custom routes in your Strapi API that go out of the REST scope or if you want to extend the `axios request config`, you can do as below::

```js
const response = await strapi.request("get", "/restaurants", {
  headers: {
    foo: "bar",
  },
});
```

> See the [axios config](https://github.com/axios/axios#request-config)
