import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/direito/',  // <-- ADICIONE ESSA LINHA para a subpasta
  build: {
    outDir: 'dist'  // Pasta de saída do build
  }
})
