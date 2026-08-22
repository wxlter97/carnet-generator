import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base relativa: el build funciona sirviéndose desde la raíz de un
  // dominio o desde un subpath tipo GitHub Pages (usuario.github.io/repo/)
  // sin tener que conocer de antemano el nombre del repositorio.
  base: './',
})
