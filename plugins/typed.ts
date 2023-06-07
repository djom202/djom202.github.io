import { defineNuxtPlugin } from "#app";
import Typed from "typed.js";

export default defineNuxtPlugin((nuxtApp: { Typedjs: any }) => {
  if (typeof window !== "undefined") {
    const select = (el, all = false) => {
      el = el.trim();
      if (all) {
        return [...document.querySelectorAll(el)];
      } else {
        return document.querySelector(el);
      }
    };

    setTimeout(() => {
      const typed = select(".typed");
      if (typed) {
        let typed_strings = typed.getAttribute("data-typed-items");
        typed_strings = typed_strings.split(",");
        nuxtApp.Typedjs = new Typed(".typed", {
          strings: typed_strings,
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000,
        });
      }
    }, 5000);
  }
});
