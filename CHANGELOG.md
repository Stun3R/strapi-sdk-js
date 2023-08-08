# [2.2.0](https://github.com/Stun3R/strapi-sdk-js/compare/v2.1.5...v2.2.0) (2022-02-17)

### Code Refactoring

- **user**: remove user's property setter & getter for better readability & setUser method. ([f86bf0a](https://github.com/Stun3R/strapi-sdk-js/commit/f86bf0ad23f3192a60ea5912349f337cce055249))
- **token**: remove syncToken and replace it via axios interceptors. JWT Token should be added into into axios headers at every request now. ([36c5a7e](https://github.com/Stun3R/strapi-sdk-js/commit/36c5a7e2788409c164fc3cde470f8ee11317704f))

## [2.1.5](https://github.com/Stun3R/strapi-sdk-js/compare/v2.1.4...v2.1.5) (2022-01-17)

### Bug Fixes

- **build**: remove es.js & replace it by .mjs ([16106d8](https://github.com/Stun3R/strapi-sdk-js/commit/16106d8f00a2a814eaf4f1d7710a0cec67132ddd))

## [2.1.4](https://github.com/Stun3R/strapi-sdk-js/compare/v2.1.3...v2.1.4) (2022-01-14)

### Breaking Changes

- **options:** remove process usage in default to be compatible with more framework ([aaa162d](https://github.com/Stun3R/strapi-sdk-js/commit/aaa162d53bc656a149da8d2aacc9560a42a11d55))

## [2.1.3](https://github.com/Stun3R/strapi-sdk-js/compare/v2.1.2...v2.1.3) (2022-01-05)

### Bug Fixes

- **deps:** pin dependencies ([2e6e5a9](https://github.com/Stun3R/strapi-sdk-js/commit/2e6e5a984e3c3bce226bdb0a55218d6707cc0488))
- **deps:** update dependency @nuxt/content-theme-docs to v0.11.1 ([1541e39](https://github.com/Stun3R/strapi-sdk-js/commit/1541e392bb9e70ee7cdc65fa1362358518c0d084))
- **deps:** update dependency axios to ^0.24.0 ([4e2a41d](https://github.com/Stun3R/strapi-sdk-js/commit/4e2a41d5a3ffca07cf502d488ce9caea809f4bbc))

## [2.1.2](https://github.com/Stun3R/strapi-sdk-js/compare/v2.1.1...v2.1.2) (2021-12-30)

### Bug Fixes

- **params:** change type to accept object for populate ([bfa835c](https://github.com/Stun3R/strapi-sdk-js/commit/bfa835c6d01425049f7d675f96316516d59bca5d)), closes [#108](https://github.com/Stun3R/strapi-sdk-js/issues/108)

### Features

- add integrations ([439b292](https://github.com/Stun3R/strapi-sdk-js/commit/439b2926e474c06a0e581f9af7c1ad08c5eb7282))

## [2.1.1](https://github.com/Stun3R/strapi-sdk-js/compare/v2.1.0...v2.1.1) (2021-11-29)

# [2.0.0](https://github.com/Stun3R/strapi-sdk-js/compare/v1.1.0...v2.0.0) (2021-11-08)

### Features

- **Strapi v4 support**
- add params to create, update, delete methods in order to selecting field in response ([a693dac](https://github.com/Stun3R/strapi-sdk-js/commit/a693dac21101260125db8672229644387b2ee3e4))
- add StrapiLocale type for better autocompletion ([583c5b8](https://github.com/Stun3R/strapi-sdk-js/commit/583c5b8d561426c581f31ed6d335fc322411be71))
- replace axios request config params by custom type based on strapi rest api parameters ([2047433](https://github.com/Stun3R/strapi-sdk-js/commit/2047433f93aaae9b4eaeb0c7f4b49cccfb46f770))
- v4 error handling ([4d0eb3f](https://github.com/Stun3R/strapi-sdk-js/commit/4d0eb3f50ed9796e7dd3837cd45a2d926e9679d5))

# [1.1.0](https://github.com/Stun3R/strapi-sdk-js/compare/v1.0.2...v1.1.0) (2021-10-19)

### Bug Fixes

- add axioserror type on error ([1140bbb](https://github.com/Stun3R/strapi-sdk-js/commit/1140bbb990c37e492aa8d457a1e65ff5a0ac24ed))
- **deps:** update dependency @types/js-cookie to v3 ([88483aa](https://github.com/Stun3R/strapi-sdk-js/commit/88483aa0ff841c440716bbe1014ff8a6ef58c27f))
- **deps:** update dependency axios to ^0.23.0 ([854e84e](https://github.com/Stun3R/strapi-sdk-js/commit/854e84e02cdb818a69dddfecb8c1530f791609c4))
- missing comma after dependencies ([6efe03b](https://github.com/Stun3R/strapi-sdk-js/commit/6efe03b1713c5df97a077d3c5db43022d3fcc3f6))
- **tests:** switch response type to follow latest change ([362b5d9](https://github.com/Stun3R/strapi-sdk-js/commit/362b5d911ffb9fbeb37de7678dd60b97c7dbf2f6))

### Code Refactoring

- drop of graphql methods support ([eebd7a3](https://github.com/Stun3R/strapi-sdk-js/commit/eebd7a34ddbce216ba0e8b3f5a3f95c0a0a5add5))

### BREAKING CHANGES

- SDK supports Strapi v4. Every CRUD methods response changed. Please refer to [documentation](https://strapi-sdk-js.netlify.app)
- GraphQL is no longer supported in v1.1.0

## [1.0.2](https://github.com/Stun3R/strapi-sdk-js/compare/v1.0.1...v1.0.2) (2021-08-30)

### Bug Fixes

- **deps:** update dependency js-cookie to v3 ([54be993](https://github.com/Stun3R/strapi-sdk-js/commit/54be993f1c02949fb320786bca409681eb6c9ed0))
- **deps:** update dependency nuxt to v2.15.7 ([062c012](https://github.com/Stun3R/strapi-sdk-js/commit/062c0121f63746c728f895fcf4b608e3e820826d))
- **deps:** update dependency nuxt to v2.15.8 ([598dacd](https://github.com/Stun3R/strapi-sdk-js/commit/598dacdeab43252d92405fc67882de2c00609b48))

## 1.0.1 (2021-06-17)

### Bug Fixes

- **npm:** dist folder is missing when installing package ([8629d3d](https://github.com/Stun3R/strapi-sdk-js/commit/8629d3d85f399925f1697a5ab39881f47e1fe5fa)) @lhillebrandt
- **dist:** change path in order to take dist inside npm package ([b494a35](https://github.com/Stun3R/strapi-sdk-js/commit/b494a352cb5559a8e9a2e2e931ee30a67836ef82))
- **package.json:** remove trailing slash from dist folder in files ([7d3000c](https://github.com/Stun3R/strapi-sdk-js/commit/7d3000c15f63443d03971bc510cecf86ae530983))

# 1.0.0 (2021-06-11)

### Bug Fixes

- **deps:** pin dependency docus to v0.1.5 ([9870d86](https://github.com/Stun3R/strapi-sdk-js/commit/9870d8669457bd31bfb184dcafc2e90b6fd0ecba))
- **deps:** update dependency nuxt to v2.15.6 ([f37aefd](https://github.com/Stun3R/strapi-sdk-js/commit/f37aefdebbcc9fb6bea8628c5b10c8c706dbc287))

### Features

- **user:** add user object, getter, setter & fetch methods ([e18089a](https://github.com/Stun3R/strapi-sdk-js/commit/e18089ae31446eeaff49c6e8a01250bc5cbe14ac))
- **auth:** add auth & token methods ([a554ee9](https://github.com/Stun3R/strapi-sdk-js/commit/a554ee9930f3dc87e792afaba571e84143707528))
- **core:** add crud methods, typescript support & graphql method ([cbe3b47](https://github.com/Stun3R/strapi-sdk-js/commit/cbe3b475dcdf49e3d6a37d594de2c69db8e185f3))
