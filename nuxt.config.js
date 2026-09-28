const baseURL = process.env.BASEURL || "/";
const normalizedBase = baseURL.endsWith("/") ? baseURL : `${baseURL}/`;
const withBase = (p) => `${normalizedBase}${p}`.replace(/\/+/g, "/");

const scriptPath =
  process.env.NODE_ENV === "production"
    ? []
    : [
        {
          src: withBase(`_nuxt/assets/vendor/purecounter/purecounter_vanilla.js`),
          body: true,
        },
        {
          src: withBase(`_nuxt/assets/vendor/aos/aos.js`),
          body: true,
        },
        {
          src: withBase(`_nuxt/assets/vendor/glightbox/js/glightbox.min.js`),
          body: true,
        },
        {
          src: withBase(`_nuxt/assets/vendor/isotope-layout/isotope.pkgd.min.js`),
          body: true,
        },
        {
          src: withBase(`_nuxt/assets/vendor/swiper/swiper-bundle.min.js`),
          body: true,
        },
        {
          src: withBase(`_nuxt/assets/vendor/typed/typed.umd.js`),
          body: true,
        },
        {
          src: withBase(`_nuxt/assets/vendor/waypoints/noframework.waypoints.js`),
          body: true,
        },
        {
          src: withBase(`_nuxt/assets/js/main.js`),
          body: true,
        },
      ];

export default defineNuxtConfig({
  ssr: false,
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "bootstrap-icons/font/bootstrap-icons.min.css",
    "boxicons/css/boxicons.min.css",
    "@/assets/vendor/glightbox/css/glightbox.min.css",
    "@/assets/vendor/swiper/swiper-bundle.min.css",
    "@/assets/vendor/aos/aos.css",
    "@/assets/css/style.css",
  ],
  app: {
    baseURL,
    head: {
      script: scriptPath,
    },
  },
  modules: [
    [
      "@storyblok/nuxt",
      {
        accessToken: process.env.ACCESSTOKEN || "",
        apiOptions: {
          region: process.env.REGION || "EU",
        },
      },
    ],
    "@nuxtjs/robots",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    [
      "nuxt-mail",
      {
        message: {
          to: process.env.SMPT_MESSAGE_TO || "",
        },
        smtp: {
          host: process.env.SMPT_HOST || "localhost",
          port: Number(process.env.SMPT_PORT) || 1025,
          auth: {
            user: process.env.SMPT_MESSAGE_TO || "",
            pass: process.env.SMPT_PASSWORD || "",
          },
        },
      },
    ],
  ],
  robots: {
    rules: {
      UserAgent: "*",
      Disallow: "",
    },
  },
  vite: {
    optimizeDeps: { exclude: ["fsevents"] },
  },
  nitro: {
    preset: "github-pages",
  },
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
