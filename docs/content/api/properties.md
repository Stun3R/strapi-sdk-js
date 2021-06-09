---
title: Properties
description: "Here are the properties you can access. 🖥"
position: 4
category: "🖥 API"
---

## `user`

This object contains details about authenticated user. You can access it using `strapi`.
```js
// get
strapi.user
// set user data
strapi.user.avatar = ''
```

## `axios`

You have access to the axios instance thanks `strapi.axios`. It allow you to set new headers or extend it:
```js
strapi.axios.defaults.headers.common["Authorization"] = `Bearer myToken`;
```
> See [Axios documentation](https://github.com/axios/axios)