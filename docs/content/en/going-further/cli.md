---
title: Command Line Interface (CLI)
menuTitle: Command Line Interface
subtitle: "Generate Typescript's Types based on your Strapi content types. 💡"
description: "Generate Typescript's Types based on your Strapi content types. 💡"
position: 8
category: "💡 Going Further"
features:
  - Generate Typescript's types based on your content types
  - Usage of GraphQL Code Generator to generate types
  - Ease-of-use thanks a beautiful prompt
---

<alert type="warning">

Please note that **this library only works with Strapi v3**.

</alert>

## Features

<list :items="features"></list>

## Getting started

### ⏳ Installation

You can easily install this CLI thanks your favorite package manager:

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add strapi-generate-types
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install --save strapi-generate-types
  ```

  </code-block>
</code-group>

### 🖐 Requirements

In order to use this generator you must have installed the GraphQL plugin **on your Strapi API**.

```bash
yarn strapi install graphql
```
> For more informations see the [GraphQL plugin](https://strapi.io/documentation/developer-docs/latest/development/plugins/graphql.html) 

### 🕹 Usage
The usage depend on which package manager you're using:

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn strapi-generate-types generate
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npx strapi-generate-types generate
  ```

  </code-block>
</code-group>

The prompt will ask you 3 things:
  1. First, the host of your Strapi API with which you want to generate your types (default: `http://localhost:1337`).
  2. Then, where you want to generate it (default: `./models/`).
  3. Finally, the name of the file which will be generated (default: `types.ts`)

Enjoy 🎉