---
title: Installation
description: "Discover how to setup this beautiful SDK. ✨"
subtitle: "Discover how to setup this beautiful SDK. ✨"
category: "🚀 Getting Started"
position: 2
---

Add `strapi-sdk-js` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add strapi-sdk-js@^1.1.0
```

  </code-block>
  <code-block label="NPM">

```bash
npm install --save strapi-sdk-js@^1.1.0
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
