

# [3.0.0](https://github.com/Stun3R/strapi-sdk-js/compare/v2.3.4...v3.0.0) (2025-02-23)

### 🚀 Features

- **Strapi v5 support**
- **docs:** updates the documentation to remove deprecated informations from v1 and totally remove in v3 ([00f9b11](https://github.com/Stun3R/strapi-sdk-js/commit/00f9b11d35e13d43684d756692b8073bf992185b))
- **type:** updates types and methods to support strapi v5 ([#203](https://github.com/Stun3R/strapi-sdk-js/pull/203)) @XanderD99

### 💥 Breaking Changes

- **refactor(types):** updates types definition to better support strapi v5 which removes params from delete method and return type ([2812b74](https://github.com/Stun3R/strapi-sdk-js/commit/2812b7440e6e5a714ad816b9aa729969f2e3baa2))


## [2.3.4](https://github.com/Stun3R/strapi-sdk-js/compare/v2.3.3...v2.3.4) (2025-02-20)

### 🐛 Bug Fixes

- **auth:** add params option to the strapi.fetchUser method ([3781536](https://github.com/Stun3R/strapi-sdk-js/commit/3781536c7a94d1c298f5ac8259dcc9bb925972c8)), closes [#195](https://github.com/Stun3R/strapi-sdk-js/issues/195)
- **auth:** allows custom property for register ([b2cafc5](https://github.com/Stun3R/strapi-sdk-js/commit/b2cafc5c5e2d1593bf00093915274a2d7ae7fceb)), closes [#198](https://github.com/Stun3R/strapi-sdk-js/issues/198)
- import nuxt composables from #imports ([59d7e1e](https://github.com/Stun3R/strapi-sdk-js/commit/59d7e1e34c194ead826a9e79ea2b015362da25ae))

## [2.3.3](https://github.com/Stun3R/strapi-sdk-js/compare/v2.3.1...v2.3.3) (2023-08-23)

### 🐛 Bug Fixes

- **type:** add missing StrapiChangePasswordData to global export ([2317627](https://github.com/Stun3R/strapi-sdk-js/commit/2317627ceefdddbf29d9d2b67b143196c52e7185)) **@mohammadGh**

## [2.3.2](https://github.com/Stun3R/strapi-sdk-js/compare/v2.3.1...v2.3.2) (2023-08-21)

### 👷‍♂️ Build

- build(deps): fix ufo import ([03f3a5d](https://github.com/Stun3R/strapi-sdk-js/commit/03f3a5d0fd674e12cc015cc16aad1b093e697950)), closes [#181](https://github.com/Stun3R/strapi-sdk-js/issues/181) thanks **@flavienrako**

## [2.3.1](https://github.com/Stun3R/strapi-sdk-js/compare/v2.3.0...v2.3.1) (2023-08-15)

### 👷‍♂️ Build

- build: update the build target to support webpack based frameworks ([e8c10ef](https://github.com/Stun3R/strapi-sdk-js/commit/e8c10ef74f757cb36d622b785c2d3ef4637fee54)), closes [#179](https://github.com/Stun3R/strapi-sdk-js/issues/179)

# [2.3.0](https://github.com/Stun3R/strapi-sdk-js/compare/v2.2.0...v2.3.0) (2023-08-10)

### 🐛 Bug Fixes

- add options `prefix` to `getProviderAuthenticationUrl` method ([3b90446](https://github.com/Stun3R/strapi-sdk-js/commit/3b904463da52741cc88d9e7dbd09c20235f63e93)), closes [#140](https://github.com/Stun3R/strapi-sdk-js/issues/140)
- remove URL constructor to allow relative URL ([e6b9022](https://github.com/Stun3R/strapi-sdk-js/commit/e6b9022585fbf7dd8a01ffa219138f8e4bf5b533)), closes [#145](https://github.com/Stun3R/strapi-sdk-js/issues/145)

### 🚀 Features

- add `change-password` request added in strapi v.4.3.3 ([7c2242a](https://github.com/Stun3R/strapi-sdk-js/commit/7c2242abfffd4237b1fe8c604fdf71c6adeb1baf)) **@AnnikenYT**

### 👷‍♂️ Build

- switch from `siroc` to `rollup` since siroc is no longer maintained ([76d798c](https://github.com/Stun3R/strapi-sdk-js/commit/76d798c5937511e431ab886d23454e730ad1b0d5))

### 🏡 Chore

- **deps:** update dependency `axios` to ^0.27.0 ([4dcbe9b](https://github.com/Stun3R/strapi-sdk-js/commit/4dcbe9b7c689d16fdded207f5bd8ad78ece8ac24))
- **deps:** update dependency `defu` to v5.0.1 ([f3c86e2](https://github.com/Stun3R/strapi-sdk-js/commit/f3c86e27ab50e08c3d7d399a4dcd395e369699ab))
- **deps:** update dependency `js-cookie` to v3.0.5 ([844af89](https://github.com/Stun3R/strapi-sdk-js/commit/844af89186d9c86ee8103fd40a8aa078f6be11ca))
- **deps:** update dependency `qs` to v6.11.2 ([080f39c](https://github.com/Stun3R/strapi-sdk-js/commit/080f39c4de6c37e8b76919bd9f98b459690dd871))

# [2.2.0](https://github.com/Stun3R/strapi-sdk-js/compare/v2.1.5...v2.2.0) (2022-02-17)

### ♻️ Refactor

- **user**: remove user's property setter & getter for better readability & setUser method. ([f86bf0a](https://github.com/Stun3R/strapi-sdk-js/commit/f86bf0ad23f3192a60ea5912349f337cce055249))
- **token**: remove syncToken and replace it via axios interceptors. JWT Token should be added into into axios headers at every request now. ([36c5a7e](https://github.com/Stun3R/strapi-sdk-js/commit/36c5a7e2788409c164fc3cde470f8ee11317704f))

## [2.1.5](https://github.com/Stun3R/strapi-sdk-js/compare/v2.1.4...v2.1.5) (2022-01-17)

### 🐛 Bug Fixes

- **build**: remove es.js & replace it by .mjs ([16106d8](https://github.com/Stun3R/strapi-sdk-js/commit/16106d8f00a2a814eaf4f1d7710a0cec67132ddd))

## [2.1.4](https://github.com/Stun3R/strapi-sdk-js/compare/v2.1.3...v2.1.4) (2022-01-14)

### 💥 Breaking Changes

- **options:** remove process usage in default to be compatible with more framework ([aaa162d](https://github.com/Stun3R/strapi-sdk-js/commit/aaa162d53bc656a149da8d2aacc9560a42a11d55))

## [2.1.3](https://github.com/Stun3R/strapi-sdk-js/compare/v2.1.2...v2.1.3) (2022-01-05)

### 🐛 Bug Fixes

- **deps:** pin dependencies ([2e6e5a9](https://github.com/Stun3R/strapi-sdk-js/commit/2e6e5a984e3c3bce226bdb0a55218d6707cc0488))
- **deps:** update dependency @nuxt/content-theme-docs to v0.11.1 ([1541e39](https://github.com/Stun3R/strapi-sdk-js/commit/1541e392bb9e70ee7cdc65fa1362358518c0d084))
- **deps:** update dependency axios to ^0.24.0 ([4e2a41d](https://github.com/Stun3R/strapi-sdk-js/commit/4e2a41d5a3ffca07cf502d488ce9caea809f4bbc))

## [2.1.2](https://github.com/Stun3R/strapi-sdk-js/compare/v2.1.1...v2.1.2) (2021-12-30)

### 🐛 Bug Fixes

- **params:** change type to accept object for populate ([bfa835c](https://github.com/Stun3R/strapi-sdk-js/commit/bfa835c6d01425049f7d675f96316516d59bca5d)), closes [#108](https://github.com/Stun3R/strapi-sdk-js/issues/108)

### 🚀 Features

- add integrations ([439b292](https://github.com/Stun3R/strapi-sdk-js/commit/439b2926e474c06a0e581f9af7c1ad08c5eb7282))

## [2.1.1](https://github.com/Stun3R/strapi-sdk-js/compare/v2.1.0...v2.1.1) (2021-11-29)

## [2.0.0](https://github.com/Stun3R/strapi-sdk-js/compare/v1.1.0...v2.0.0) (2021-11-08)

### 🚀 Features

- **Strapi v4 support**
- add params to create, update, delete methods in order to selecting field in response ([a693dac](https://github.com/Stun3R/strapi-sdk-js/commit/a693dac21101260125db8672229644387b2ee3e4))
- add StrapiLocale type for better autocompletion ([583c5b8](https://github.com/Stun3R/strapi-sdk-js/commit/583c5b8d561426c581f31ed6d335fc322411be71))
- replace axios request config params by custom type based on strapi rest api parameters ([2047433](https://github.com/Stun3R/strapi-sdk-js/commit/2047433f93aaae9b4eaeb0c7f4b49cccfb46f770))
- v4 error handling ([4d0eb3f](https://github.com/Stun3R/strapi-sdk-js/commit/4d0eb3f50ed9796e7dd3837cd45a2d926e9679d5))

## [1.1.0](https://github.com/Stun3R/strapi-sdk-js/compare/v1.0.2...v1.1.0) (2021-10-19)

### 🐛 Bug Fixes

- add axioserror type on error ([1140bbb](https://github.com/Stun3R/strapi-sdk-js/commit/1140bbb990c37e492aa8d457a1e65ff5a0ac24ed))
- **deps:** update dependency @types/js-cookie to v3 ([88483aa](https://github.com/Stun3R/strapi-sdk-js/commit/88483aa0ff841c440716bbe1014ff8a6ef58c27f))
- **deps:** update dependency axios to ^0.23.0 ([854e84e](https://github.com/Stun3R/strapi-sdk-js/commit/854e84e02cdb818a69dddfecb8c1530f791609c4))
- missing comma after dependencies ([6efe03b](https://github.com/Stun3R/strapi-sdk-js/commit/6efe03b1713c5df97a077d3c5db43022d3fcc3f6))
- **tests:** switch response type to follow latest change ([362b5d9](https://github.com/Stun3R/strapi-sdk-js/commit/362b5d911ffb9fbeb37de7678dd60b97c7dbf2f6))

### ♻️ Refactor

- drop of graphql methods support ([eebd7a3](https://github.com/Stun3R/strapi-sdk-js/commit/eebd7a34ddbce216ba0e8b3f5a3f95c0a0a5add5))

### 💥 Breaking Changes

- SDK supports Strapi v4. Every CRUD methods response changed. Please refer to [documentation](https://strapi-sdk-js.netlify.app)
- GraphQL is no longer supported in v1.1.0

## [1.0.2](https://github.com/Stun3R/strapi-sdk-js/compare/v1.0.1...v1.0.2) (2021-08-30)

### 🐛 Bug Fixes

- **deps:** update dependency js-cookie to v3 ([54be993](https://github.com/Stun3R/strapi-sdk-js/commit/54be993f1c02949fb320786bca409681eb6c9ed0))
- **deps:** update dependency nuxt to v2.15.7 ([062c012](https://github.com/Stun3R/strapi-sdk-js/commit/062c0121f63746c728f895fcf4b608e3e820826d))
- **deps:** update dependency nuxt to v2.15.8 ([598dacd](https://github.com/Stun3R/strapi-sdk-js/commit/598dacdeab43252d92405fc67882de2c00609b48))

## [1.0.1](https://github.com/Stun3R/strapi-sdk-js/compare/v1.0.0...v1.0.1) (2021-06-17)

### 🐛 Bug Fixes

- **npm:** dist folder is missing when installing package ([8629d3d](https://github.com/Stun3R/strapi-sdk-js/commit/8629d3d85f399925f1697a5ab39881f47e1fe5fa)) @lhillebrandt
- **dist:** change path in order to take dist inside npm package ([b494a35](https://github.com/Stun3R/strapi-sdk-js/commit/b494a352cb5559a8e9a2e2e931ee30a67836ef82))
- **package.json:** remove trailing slash from dist folder in files ([7d3000c](https://github.com/Stun3R/strapi-sdk-js/commit/7d3000c15f63443d03971bc510cecf86ae530983))

## 1.0.0 (2021-06-11)

### 🐛 Bug Fixes

- **deps:** pin dependency docus to v0.1.5 ([9870d86](https://github.com/Stun3R/strapi-sdk-js/commit/9870d8669457bd31bfb184dcafc2e90b6fd0ecba))
- **deps:** update dependency nuxt to v2.15.6 ([f37aefd](https://github.com/Stun3R/strapi-sdk-js/commit/f37aefdebbcc9fb6bea8628c5b10c8c706dbc287))

### 🚀 Features

- **user:** add user object, getter, setter & fetch methods ([e18089a](https://github.com/Stun3R/strapi-sdk-js/commit/e18089ae31446eeaff49c6e8a01250bc5cbe14ac))
- **auth:** add auth & token methods ([a554ee9](https://github.com/Stun3R/strapi-sdk-js/commit/a554ee9930f3dc87e792afaba571e84143707528))
- **core:** add crud methods, typescript support & graphql method ([cbe3b47](https://github.com/Stun3R/strapi-sdk-js/commit/cbe3b475dcdf49e3d6a37d594de2c69db8e185f3))