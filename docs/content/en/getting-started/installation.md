---
title: Installation
description: "Discover how to setup this beautiful SDK. ✨"
subtitle: "Discover how to setup this beautiful SDK. ✨"
category: "🚀 Getting Started"
position: 2
---

<alert type="warning">

  If you are using Strapi **< v4**, you have to add **strapi-sdk-js@"<2.0.0"** as dependency.

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
import Strapi from 'strapi-sdk-js'

const strapi = new Strapi()
```

## Configuration

You can pass multiple options to the `constructor`:

```js
import Strapi from 'strapi-sdk-js'

const strapi = new Strapi({
  // Options
})
```

See [options](/api/options) for available options.
