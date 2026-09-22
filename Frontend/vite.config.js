import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/Remove-Item -Recurse -Force node_modules, package-lock.json

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backendUrl = env.VITE_BACKEND_URL || "http://localhost:5002";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 4001,
      proxy: {
        "/api": {
          target: backendUrl,
          changeOrigin: true,
        },
      },
    },
  };
});
