import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Update if backend runs on a different port
        changeOrigin: true, // Useful for dealing with CORS issues
        secure: false, // Disables SSL verification if target uses HTTP
      },
    },
  },
  plugins: [react()],
});
