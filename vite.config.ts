import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  import path from 'path';
  
  export default defineConfig({
    plugins: [react()],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.js'),
        name: 'MyLib',
        fileName: (format) => `my-lib.${format}.js`
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          }
        }
      }
    }
  });