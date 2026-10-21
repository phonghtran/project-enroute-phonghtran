import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // keep the existing REACT_APP_* names in .env
  envPrefix: "REACT_APP_",
  // Bootstrap 4 SCSS predates the Dart Sass module system
  css: {
    preprocessorOptions: {
      scss: { quietDeps: true, silenceDeprecations: ["import", "global-builtin"] },
    },
  },
  server: { port: 3000 },
  // firebase.json serves from build/, same as CRA did
  build: { outDir: "build" },
});
