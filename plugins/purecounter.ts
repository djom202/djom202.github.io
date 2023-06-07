import { defineNuxtPlugin } from "#app";
// import { PureCounter } from "@srexi/purecounterjs";

export default defineNuxtPlugin((nuxtApp: { PureCounter: any }) => {
  if (typeof window !== "undefined") {
    // nuxtApp.PureCounter = new PureCounter();
  }
});
