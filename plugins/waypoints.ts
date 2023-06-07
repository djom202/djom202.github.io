import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp: { Waypoints: any }) => {
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
      let skilsContent = select(".skills-content");
      if (skilsContent) {
        nuxtApp.Waypoints = new Waypoint({
          element: skilsContent,
          offset: "80%",
          handler: function (direction) {
            let progress = select(".progress .progress-bar", true);
            progress.forEach((el) => {
              el.style.width = el.getAttribute("aria-valuenow") + "%";
            });
          },
        });
      }
    }, 5000);
  }
});
