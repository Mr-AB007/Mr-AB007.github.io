import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User site (Mr-AB007.github.io) is served from the domain root.
// For a project site (github.io/<repo>/) set BASE_PATH=/<repo>/ when building.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH ?? '/',
  build: { target: 'es2020', cssCodeSplit: true, sourcemap: false },
})
