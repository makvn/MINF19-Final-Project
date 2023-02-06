import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
// });

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // console.log('ENV CLIENT VITE', env)

  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: env.CLIENT_PORT,
      host: true
    }
  }
})