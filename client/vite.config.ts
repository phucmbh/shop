import { defineConfig, type PluginOption } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer() as PluginOption],
  server: {
    port: 3000
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
