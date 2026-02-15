import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import pc from 'picocolors';

export default defineConfig({
  logLevel: 'warn',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'startup-banner',
      configureServer(server) {
        server.httpServer?.once('listening', () => {
          const address = server.httpServer?.address();
          if (typeof address === 'object' && address) {
            console.log(pc.green(`🚀 Web app running at http://localhost:${address.port}`));
          }
        });
      },
    },
  ],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      // Proxy API calls to the Fastify server in development
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
