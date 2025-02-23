export default defineAppConfig({
  docus: {
    title: "Strapi SDK",
    description: "The SDK for seamless integration with your Strapi API.",
    url: "https://v2-strapi-sdk-js.netlify.app/",
    image: "/preview.png",

    socials: {
      twitter: "Stun3R_",
      github: "Stun3R/strapi-sdk-js",
    },

    github: {
      dir: "docs/content",
      branch: "v2",
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
      iconLinks: [
        {
          label: "Strapi",
          href: "https://strapi.io",
          icon: "simple-icons:strapi",
        },
      ],
    },

    titleTemplate: "%s · Strapi SDK",
  },
});
