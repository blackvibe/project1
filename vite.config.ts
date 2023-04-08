import solid from "solid-start/vite";
import { defineConfig } from "vite";
// import legacy from '@vitejs/plugin-legacy'

import { PluginOption } from "vite";


// function I18nHotReload(): PluginOption {
//   return {
//     name: 'i18n-hot-reload',
//     handleHotUpdate({ file, server }) {
//       if (file.endsWith('.json')) {
//         console.log('Locale file updated')
//         server.ws.send({
//           type: "custom",
//           event: "locales-update",
//         });
//       }
//     },
//   }
// }

export default defineConfig({
  // build : {
  //   target: "es5"
  // },

  plugins: [
  //   legacy({
  //   targets: ['ie 8'],
  // }),
  //I18nHotReload(),
  solid({islands: false, islandsRouter: false})
],
});
