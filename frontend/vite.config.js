import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  const isDev = command === "serve";

  return {
    plugins: [react()],
    server: {
      proxy: isDev
        ? {
            "/api": {
              target: "http://localhost:4040",
              changeOrigin: true,
            },
          }
        : {},
    },
  };
});