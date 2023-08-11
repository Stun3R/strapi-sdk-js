export default defineAppConfig({
  docus: {
    title: "Strapi SDK",
    description: "The SDK for seamless integration with your Strapi API.",
    url: "https://strapi-sdk-js.netlify.app/",
    image: "",
    socials: {
      twitter: "Stun3R_",
      github: "Stun3R/strapi-sdk-js",
    },
    github: {
      dir: "docs/content",
      branch: "develop",
      repo: "strapi-sdk-js",
      owner: "Stun3R",
      edit: true,
    },
    aside: {
      level: 0,
      collapsed: false,
      exclude: [],
    },
    main: {
      padded: true,
      fluid: true,
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
      fluid: true,
    },
    footer: {
      credits: false,
    },
  },
});
