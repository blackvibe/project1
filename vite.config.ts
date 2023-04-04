import solid from "solid-start/vite";
import { defineConfig } from "vite";
// import legacy from '@vitejs/plugin-legacy'


export default defineConfig({
  // build : {
  //   target: "es5"
  // },

  plugins: [
  //   legacy({
  //   targets: ['ie 8'],
  // }),
  solid({islands: false, islandsRouter: false})
],
});
