// vite.config.ts
import path from "node:path";
import { defineConfig } from "file:///C:/Users/Gmoo/Desktop/%E4%BA%91%E5%9B%BE6/yuntu-web/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Gmoo/Desktop/%E4%BA%91%E5%9B%BE6/yuntu-web/node_modules/@vitejs/plugin-react/dist/index.js";
import { VitePWA } from "file:///C:/Users/Gmoo/Desktop/%E4%BA%91%E5%9B%BE6/yuntu-web/node_modules/vite-plugin-pwa/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\Gmoo\\Desktop\\\u4E91\u56FE6\\yuntu-web";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "\u4E91\u56FE\u667A\u6167\u56FE\u4E66\u9986",
        short_name: "\u4E91\u56FE",
        description: "\u627E\u4E66 \xB7 \u8D44\u6E90 \xB7 \u5EA7\u4F4D \xB7 AI \u54A8\u8BE2 \xB7 \u901A\u77E5 \xB7 \u4E2A\u4EBA\u4E2D\u5FC3",
        theme_color: "#0f766e",
        background_color: "#f8fafc",
        display: "standalone",
        lang: "zh-CN",
        start_url: "/"
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,svg,png,woff2}"]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxHbW9vXFxcXERlc2t0b3BcXFxcXHU0RTkxXHU1NkZFNlxcXFx5dW50dS13ZWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEdtb29cXFxcRGVza3RvcFxcXFxcdTRFOTFcdTU2RkU2XFxcXHl1bnR1LXdlYlxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvR21vby9EZXNrdG9wLyVFNCVCQSU5MSVFNSU5QiVCRTYveXVudHUtd2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxuICAgICAgaW5jbHVkZUFzc2V0czogWydmYXZpY29uLnN2ZyddLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogJ1x1NEU5MVx1NTZGRVx1NjY3QVx1NjE2N1x1NTZGRVx1NEU2Nlx1OTk4NicsXG4gICAgICAgIHNob3J0X25hbWU6ICdcdTRFOTFcdTU2RkUnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1x1NjI3RVx1NEU2NiBcdTAwQjcgXHU4RDQ0XHU2RTkwIFx1MDBCNyBcdTVFQTdcdTRGNEQgXHUwMEI3IEFJIFx1NTRBOFx1OEJFMiBcdTAwQjcgXHU5MDFBXHU3N0U1IFx1MDBCNyBcdTRFMkFcdTRFQkFcdTRFMkRcdTVGQzMnLFxuICAgICAgICB0aGVtZV9jb2xvcjogJyMwZjc2NmUnLFxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiAnI2Y4ZmFmYycsXG4gICAgICAgIGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcbiAgICAgICAgbGFuZzogJ3poLUNOJyxcbiAgICAgICAgc3RhcnRfdXJsOiAnLycsXG4gICAgICB9LFxuICAgICAgd29ya2JveDoge1xuICAgICAgICBnbG9iUGF0dGVybnM6IFsnKiovKi57anMsY3NzLGh0bWwsaWNvLHN2Zyxwbmcsd29mZjJ9J10sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcHJveHk6IHtcbiAgICAgICcvYXBpJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjgwODAnLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1VCxPQUFPLFVBQVU7QUFDeFUsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUh4QixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxlQUFlLENBQUMsYUFBYTtBQUFBLE1BQzdCLFVBQVU7QUFBQSxRQUNSLE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQSxRQUNiLGFBQWE7QUFBQSxRQUNiLGtCQUFrQjtBQUFBLFFBQ2xCLFNBQVM7QUFBQSxRQUNULE1BQU07QUFBQSxRQUNOLFdBQVc7QUFBQSxNQUNiO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUCxjQUFjLENBQUMsc0NBQXNDO0FBQUEsTUFDdkQ7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
