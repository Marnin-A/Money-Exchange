import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    base: process.env.PUBLIC_URL,
    screens: {
      sm: { max: "639px" },
      md2: "920px",
    },
  };
});
