import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiUrl =
    env.API_URL ||
    env.NEXT_PUBLIC_API_URL ||
    env.VITE_API_URL ||
    "http://localhost:5000";

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    envPrefix: ["API_", "VITE_", "NEXT_PUBLIC_"],
    define: {
      "process.env.NEXT_PUBLIC_API_URL": JSON.stringify(apiUrl),
      "import.meta.env.API_URL": JSON.stringify(apiUrl),
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
})
