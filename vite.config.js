import { defineConfig } from 'vite';

export default defineConfig({
  // Projenin build çıktısını düzgün vermesi ve konfigürasyon hatası fırlatmaması için bir obje döndürüyoruz
  root: './',
  build: {
    outDir: 'dist',
  }
});