import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react") ||
            id.includes("react-router-dom")
          ) {
            return "react";
          }
          if (id.includes("recharts")) return "charts";
          if (id.includes("@tsparticles") || id.includes("tsparticles")) {
            return "particles";
          }
          if (id.includes("date-fns") || id.includes("react-datepicker")) {
            return "dates";
          }
          return undefined;
        },
      },
    },
  },
});
