import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {},
  build: {
    outDir: "dist",
  },
  base: "/", // Ensure proper routing on deployment
});
