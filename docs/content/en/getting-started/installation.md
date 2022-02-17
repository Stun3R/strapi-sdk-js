---
title: Installation
description: "Discover how to setup this beautiful SDK. ✨"
subtitle: "Discover how to setup this beautiful SDK. ✨"
category: "🚀 Getting Started"
position: 2
---

<alert type="info">

If you are using Strapi **v3**, check out [here](https://v1-strapi-sdk-js.netlify.app) the documentation of the SDK `v1`

</alert>

Add `strapi-sdk-js` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add strapi-sdk-js
```

  </code-block>
  <code-block label="NPM">

```bash
npm install --save strapi-sdk-js
```

  </code-block>
</code-group>

Then you can create a new instance by importing `strapi-sdk-js` in your project:

```js
import Strapi from "strapi-sdk-js";

const strapi = new Strapi();
```

## Configuration

You can pass multiple options to the `constructor`:

```js
import Strapi from "strapi-sdk-js";

const strapi = new Strapi({
  // Options
});
```

See [options](/api/options) for available options.
