import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    // Kök dizini projenin ana klasörü yapıyoruz çünkü yeni HTML'lerimiz burada
    root: '.', 
    build: {
      sourcemap: true,
      rollupOptions: {
        // Kök dizindeki yeni index.html, catalog.html, library.html dosyalarını yakalar
        input: glob.sync('./*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      // root '.' olduğu için çıktıyı doğrudan 'dist' klasörüne verebiliriz
      outDir: 'dist',
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      // Yeni HTML konumlarına göre dosya takibini güncelliyoruz
      FullReload(['./*.html', './src/partials/*.html']),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});