import pkg from "../package.json";

export default defineNuxtConfig({
  // https://github.com/nuxt-themes/docus
  extends: "@nuxt-themes/docus",

  modules: [
    "@nuxthq/studio",
    // https://github.com/nuxt-modules/plausible
    "@nuxtjs/plausible",
    // https://github.com/nuxt/devtools
    "@nuxt/devtools",
  ],
  runtimeConfig: {
    app: {
      sdkVersion: pkg.version,
    },
  },
});
