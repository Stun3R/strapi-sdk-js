---
title: Integrations
subtitle: "How to use this SDK within your favorite Framework. 🚀"
description: "How to use this SDK within your favorite Framework. 🚀"
position: 10
category: "💡 Going Further"
---

## Nuxt 2

In order to use `Strapi SDK` globally you have to setup a `plugin` & add it into the `nuxt.config.js` file:

```js [~/plugins/strapi.js]
import Strapi from "strapi-sdk-js";

export default ({ app }, inject) => {
  const strapi = new Strapi({
    // options
  });

  inject("strapi", strapi);
};
```

```js [nuxt.config.js]
export default {
  // ...
  plugins: ["~/plugins/strapi"],
};
```

You can now use it globally thanks `this.$strapi` in components & `app.$strapi` in `asyncData` function.

## Nuxt 3

Unlike **Nuxt 2**, you will only have to setup a `plugin` and then you will just have to retrieve `$strapi` from `useNuxtApp` everywhere you want to use it:

```js [~/plugins/strapi.js]
import { defineNuxtPlugin } from "#app";
import Strapi from "strapi-sdk-js";

export default defineNuxtPlugin(() => {
  const strapi = new Strapi({
    url: "http://api.isstrapiready.com",
    prefix: "v1",
  });
  return {
    provide: {
      strapi,
    },
  };
});
```

```js
<script setup>
  const {$strapi} = useNuxtApp(); const restaurants = await
  $strapi.find("restaurants");
</script>
```
