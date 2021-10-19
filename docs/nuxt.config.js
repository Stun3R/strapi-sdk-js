import theme from "@nuxt/content-theme-docs";

export default theme({
  docs: {
    primary: "#8e75ff",
  },
  loading: { color: "#8e75ff" },
  head: {
    meta: [{ name: "theme-color", content: "#8e75ff" }],
  },
  buildModules: [
    // https://pwa.nuxtjs.org/
    "@nuxtjs/pwa",
  ],
  pwa: {
    manifest: {
      name: "Strapi SDK Documentation",
      description: "Documentation for Strapi SDK",
      theme_color: "#8e75ff",
    },
  },
});
