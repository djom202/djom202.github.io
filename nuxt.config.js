export default defineNuxtConfig({
  ssr: false,
  target: "static",
  css: [
    // "@/node_modules/aos/dist/aos.css",
    "@/node_modules/bootstrap/dist/css/bootstrap.min.css",
    "@/node_modules/bootstrap-icons/font/bootstrap-icons.min.css",
    "@/node_modules/boxicons/css/boxicons.min.css",
    // "@/node_modules/glightbox/dist/css/glightbox.min.css",
    // "@/node_modules/swiper/swiper-bundle.min.css",
    "@/assets/css/style.css",
  ],
  app: {
    baseURL: process.env.BASEURL,
    head: {
      script: [
        {
          src: "_nuxt/node_modules/@srexi/purecounterjs/dist/purecounter_vanilla.js",
          body: true,
        },
        // {
        //   src: "_nuxt/node_modules/aos/dist/aos.js",
        //   body: true,
        // },
        // {
        //   src: "_nuxt/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
        //   body: true,
        // },
        // {
        //   src: "_nuxt/node_modules/glightbox/dist/js/glightbox.min.js",
        //   body: true,
        // },
        {
          src: "_nuxt/node_modules/isotope-layout/dist/isotope.pkgd.min.js",
          body: true,
        },
        // {
        //   src: "_nuxt/node_modules/swiper/swiper-bundle.min.js",
        //   body: true,
        // },
        // {
        //   src: "_nuxt/node_modules/typed.js/dist/typed.umd.js",
        //   body: true,
        // },
        {
          src: "_nuxt/node_modules/waypoints/lib/noframework.waypoints.min.js",
          body: true,
        },
        { src: "_nuxt/assets/js/main.js", body: true },
      ],
    },
  },
  modules: [
    [
      "@storyblok/nuxt",
      {
        accessToken: process.env.ACCESSTOKEN,
        apiOptions: {
          region: "us", // Set 'US" if your space is created in US region (EU default)
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
  // plugins: [{ src: "~/plugins/aos", mode: "client", ssr: false }],
});
