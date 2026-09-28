const baseURL = process.env.BASEURL || "/";
const normalizedBase = baseURL.endsWith("/") ? baseURL : `${baseURL}/`;
const withBase = (p) => `${normalizedBase}${p}`.replace(/\/+/g, "/");

// Vendor + template JS served from public/vendor, so they resolve
// identically in dev and in the static production output
// (raw files under assets/ are NOT copied to .output/public).
const vendorScripts = [
  `vendor/purecounter/purecounter_vanilla.js`,
  `vendor/aos/aos.js`,
  `vendor/glightbox/js/glightbox.min.js`,
  `vendor/isotope-layout/isotope.pkgd.min.js`,
  `vendor/swiper/swiper-bundle.min.js`,
  `vendor/typed/typed.umd.js`,
  `vendor/waypoints/noframework.waypoints.js`,
  `vendor/js/main.js`,
];

const scriptPath = vendorScripts.map((src) => ({
  src: withBase(src),
  // Head + defer: Nuxt 3.5 drops body-positioned app.head scripts from the
  // ssr:false shell, and headTags ARE rendered. defer keeps the original
  // end-of-body execution order (DOM ready, sequential).
  defer: true,
}));

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
          // storyblok-js-client only accepts lowercase: "eu" | "us" | "cn"
          region: (process.env.REGION || "eu").toLowerCase(),
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
