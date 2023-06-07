import { defineNuxtPlugin } from "#app";
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";

export default defineNuxtPlugin((nuxtApp: { Swiper: any }) => {
  if (typeof window !== "undefined") {
    /**
     * Portfolio details slider
     */
    setTimeout(() => {
      nuxtApp.Swiper = new Swiper(".portfolio-details-slider", {
        speed: 400,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
      });
    }, 5000);
  }
});
