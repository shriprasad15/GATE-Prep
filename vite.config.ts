import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // Base path for GitHub Pages: /<REPO_NAME>/
    // We use an environment variable so the GitHub Action can inject the repo name automatically
    base: process.env.GITHUB_PAGES ? `/${process.env.REPO_NAME}/` : '/',
    define: {
      // This injects the API_KEY from GitHub Secrets into the client-side code during build
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Polyfill process.env to prevent crashes
      'process.env': {} 
    }
  };
});