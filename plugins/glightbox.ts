import { defineNuxtPlugin } from "#app";
import Glightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";

export default defineNuxtPlugin((nuxtApp: { Glightbox: any }) => {
  if (typeof window !== "undefined") {
    setTimeout(() => {
      nuxtApp.Glightbox = Glightbox({
        selector: ".portfolio-lightbox",
      });
    }, 5000);
  }
});
