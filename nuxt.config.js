const scriptPath =
  process.env.NODE_ENV === "production"
    ? []
    : [
        {
          src: `_nuxt/assets/vendor/purecounter/purecounter_vanilla.js`,
          body: true,
        },
        {
          src: `_nuxt/assets/vendor/aos/aos.js`,
          body: true,
        },
        {
          src: `_nuxt/assets/vendor/glightbox/js/glightbox.min.js`,
          body: true,
        },
        {
          src: `_nuxt/assets/vendor/isotope-layout/isotope.pkgd.min.js`,
          body: true,
        },
        {
          src: `_nuxt/assets/vendor/swiper/swiper-bundle.min.js`,
          body: true,
        },
        {
          src: `_nuxt/assets/vendor/typed/typed.umd.js`,
          body: true,
        },
        {
          src: `_nuxt/assets/vendor/waypoints/noframework.waypoints.js`,
          body: true,
        },
        {
          src: `_nuxt/assets/js/main.js`,
          body: true,
        },
      ];

export default defineNuxtConfig({
  ssr: false,
  target: "static",
  css: [
    "@/node_modules/bootstrap/dist/css/bootstrap.min.css",
    "@/node_modules/bootstrap-icons/font/bootstrap-icons.min.css",
    "@/node_modules/boxicons/css/boxicons.min.css",
    "@/assets/vendor/glightbox/css/glightbox.min.css",
    "@/assets/vendor/swiper/swiper-bundle.min.css",
    "@/assets/vendor/aos/aos.css",
    "@/assets/css/style.min.css",
  ],
  app: {
    baseURL: process.env.BASEURL,
    head: {
      script: scriptPath,
    },
  },
  modules: [
    [
      "@storyblok/nuxt",
      {
        accessToken: process.env.ACCESSTOKEN,
        apiOptions: {
          region: process.env.REGION, // Set 'US" if your space is created in US region (EU default)
        },
      },
      [
        "@nuxtjs/robots",
        {
          UserAgent: "*",
          Disallow: "",
        },
      ],
      "@nuxtjs/sitemap",
      "@nuxtjs/axios",
    ],
    "@nuxtjs/tailwindcss",
    [
      "nuxt-mail",
      {
        message: {
          to: process.env.SMPT_MESSAGE_TO,
        },
        smtp: {
          host: process.env.SMPT_HOST,
          port: process.env.SMPT_PORT,
          auth: {
            user: process.env.SMPT_MESSAGE_TO,
            pass: process.env.SMPT_PASSWORD,
          },
        },
      },
    ],
  ],
  vite: {
    optimizeDeps: { exclude: ["fsevents"] },
  },
  buildModules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    preconnect: true,
    useStylesheet: true,
    families: {
      "Open+Sans": {
        wght: [300, 400, 600, 700],
        ital: [300, 400, 600, 700],
      },
      Raleway: {
        wght: [300, 400, 500, 600, 700],
        ital: [300, 400, 500, 600, 700],
      },
      Poppins: {
        wght: [300, 400, 500, 600, 700],
        ital: [300, 400, 500, 600, 700],
      },
    },
  },
});
