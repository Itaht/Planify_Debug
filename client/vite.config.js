import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  define: {
    'process.env': {}, // To avoid issues with process usage
  },
  plugins: [react()],
  envDir: '../', // Ensure this matches the location of your environment variables file
  server: {
    allowedHosts: ['lbs-field-barriers-grenada.trycloudflare.com'],
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Ensure this matches your backend API URL
        changeOrigin: true,
        secure: false, // Disable SSL verification for dev environment
        ws: true,  // Proxy WebSocket connections
      },
      '/socket': {
        target: 'wss://discord.com/api/', // Proxy Discord WebSocket API requests
        ws: true, // Ensure WebSocket is properly proxied
      },
    },
    hmr: {
      clientPort: 5173, // Adjust this if your frontend is on a different port
    },
  },
});
