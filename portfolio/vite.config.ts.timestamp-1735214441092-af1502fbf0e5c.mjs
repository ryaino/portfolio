// portfolio/vite.config.ts
import analog from "file:///C:/Users/Ryan/source/Angular/portfolio/node_modules/@analogjs/platform/src/index.js";
import { defineConfig, splitVendorChunkPlugin } from "file:///C:/Users/Ryan/source/Angular/portfolio/node_modules/vite/dist/node/index.js";
import { nxViteTsPaths } from "file:///C:/Users/Ryan/source/Angular/portfolio/node_modules/@nx/vite/plugins/nx-tsconfig-paths.plugin.js";
var __vite_injected_original_dirname = "C:\\Users\\Ryan\\source\\Angular\\portfolio\\portfolio";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    root: __vite_injected_original_dirname,
    cacheDir: `../node_modules/.vite`,
    build: {
      outDir: "../dist/./portfolio/client",
      reportCompressedSize: true,
      target: ["es2020"]
    },
    server: {
      fs: {
        allow: ["."]
      }
    },
    plugins: [
      analog({
        vite: {
          inlineStylesExtension: "scss"
        },
        nitro: {
          storage: {
            db: {
              driver: "memory"
            }
          }
        }
      }),
      nxViteTsPaths(),
      splitVendorChunkPlugin()
    ],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["src/test-setup.ts"],
      include: ["**/*.spec.ts"],
      reporters: ["default"]
    },
    define: {
      "import.meta.vitest": mode !== "production"
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicG9ydGZvbGlvL3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcUnlhblxcXFxzb3VyY2VcXFxcQW5ndWxhclxcXFxwb3J0Zm9saW9cXFxccG9ydGZvbGlvXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxSeWFuXFxcXHNvdXJjZVxcXFxBbmd1bGFyXFxcXHBvcnRmb2xpb1xcXFxwb3J0Zm9saW9cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1J5YW4vc291cmNlL0FuZ3VsYXIvcG9ydGZvbGlvL3BvcnRmb2xpby92aXRlLmNvbmZpZy50c1wiOy8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZXN0XCIgLz5cblxuaW1wb3J0IGFuYWxvZyBmcm9tICdAYW5hbG9nanMvcGxhdGZvcm0nO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBQbHVnaW4sIHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4gfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IG54Vml0ZVRzUGF0aHMgfSBmcm9tICdAbngvdml0ZS9wbHVnaW5zL254LXRzY29uZmlnLXBhdGhzLnBsdWdpbic7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgcm9vdDogX19kaXJuYW1lLFxuICAgIGNhY2hlRGlyOiBgLi4vbm9kZV9tb2R1bGVzLy52aXRlYCxcblxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXI6ICcuLi9kaXN0Ly4vcG9ydGZvbGlvL2NsaWVudCcsXG4gICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogdHJ1ZSxcbiAgICAgIHRhcmdldDogWydlczIwMjAnXSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgZnM6IHtcbiAgICAgICAgYWxsb3c6IFsnLiddLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIGFuYWxvZyh7XG4gICAgICAgIHZpdGU6IHtcbiAgICAgICAgICBpbmxpbmVTdHlsZXNFeHRlbnNpb246ICdzY3NzJ1xuICAgICAgICB9LFxuICAgICAgICBuaXRybzoge1xuICAgICAgICAgIHN0b3JhZ2U6IHtcbiAgICAgICAgICAgIGRiOiB7XG4gICAgICAgICAgICAgIGRyaXZlcjogXCJtZW1vcnlcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSksXG5cbiAgICAgIG54Vml0ZVRzUGF0aHMoKSxcbiAgICAgIHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4oKSxcbiAgICBdLFxuICAgIHRlc3Q6IHtcbiAgICAgIGdsb2JhbHM6IHRydWUsXG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgICAgIHNldHVwRmlsZXM6IFsnc3JjL3Rlc3Qtc2V0dXAudHMnXSxcbiAgICAgIGluY2x1ZGU6IFsnKiovKi5zcGVjLnRzJ10sXG4gICAgICByZXBvcnRlcnM6IFsnZGVmYXVsdCddLFxuICAgIH0sXG4gICAgZGVmaW5lOiB7XG4gICAgICAnaW1wb3J0Lm1ldGEudml0ZXN0JzogbW9kZSAhPT0gJ3Byb2R1Y3Rpb24nLFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxPQUFPLFlBQVk7QUFDbkIsU0FBUyxjQUFzQiw4QkFBOEI7QUFDN0QsU0FBUyxxQkFBcUI7QUFKOUIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBRVYsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1Isc0JBQXNCO0FBQUEsTUFDdEIsUUFBUSxDQUFDLFFBQVE7QUFBQSxJQUNuQjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sSUFBSTtBQUFBLFFBQ0YsT0FBTyxDQUFDLEdBQUc7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsTUFBTTtBQUFBLFVBQ0osdUJBQXVCO0FBQUEsUUFDekI7QUFBQSxRQUNBLE9BQU87QUFBQSxVQUNMLFNBQVM7QUFBQSxZQUNQLElBQUk7QUFBQSxjQUNGLFFBQVE7QUFBQSxZQUNWO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxNQUVELGNBQWM7QUFBQSxNQUNkLHVCQUF1QjtBQUFBLElBQ3pCO0FBQUEsSUFDQSxNQUFNO0FBQUEsTUFDSixTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixZQUFZLENBQUMsbUJBQW1CO0FBQUEsTUFDaEMsU0FBUyxDQUFDLGNBQWM7QUFBQSxNQUN4QixXQUFXLENBQUMsU0FBUztBQUFBLElBQ3ZCO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixzQkFBc0IsU0FBUztBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
