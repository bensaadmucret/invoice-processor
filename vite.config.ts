import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: ["es2020", "chrome87", "edge88", "firefox78", "safari14"],
  },
});
