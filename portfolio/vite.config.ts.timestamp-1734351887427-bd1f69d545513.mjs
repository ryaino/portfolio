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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicG9ydGZvbGlvL3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcUnlhblxcXFxzb3VyY2VcXFxcQW5ndWxhclxcXFxwb3J0Zm9saW9cXFxccG9ydGZvbGlvXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxSeWFuXFxcXHNvdXJjZVxcXFxBbmd1bGFyXFxcXHBvcnRmb2xpb1xcXFxwb3J0Zm9saW9cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1J5YW4vc291cmNlL0FuZ3VsYXIvcG9ydGZvbGlvL3BvcnRmb2xpby92aXRlLmNvbmZpZy50c1wiOy8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZXN0XCIgLz5cblxuaW1wb3J0IGFuYWxvZyBmcm9tICdAYW5hbG9nanMvcGxhdGZvcm0nO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBQbHVnaW4sIHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4gfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IG54Vml0ZVRzUGF0aHMgfSBmcm9tICdAbngvdml0ZS9wbHVnaW5zL254LXRzY29uZmlnLXBhdGhzLnBsdWdpbic7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgcm9vdDogX19kaXJuYW1lLFxuICAgIGNhY2hlRGlyOiBgLi4vbm9kZV9tb2R1bGVzLy52aXRlYCxcblxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXI6ICcuLi9kaXN0Ly4vcG9ydGZvbGlvL2NsaWVudCcsXG4gICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogdHJ1ZSxcbiAgICAgIHRhcmdldDogWydlczIwMjAnXSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgZnM6IHtcbiAgICAgICAgYWxsb3c6IFsnLiddLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcblxuICAgICAgYW5hbG9nKHtcbiAgICAgICAgdml0ZToge1xuICAgICAgICAgIGlubGluZVN0eWxlc0V4dGVuc2lvbjogJ3Njc3MnXG4gICAgICAgIH1cbiAgICAgIH0pLFxuXG4gICAgICBueFZpdGVUc1BhdGhzKCksXG4gICAgICBzcGxpdFZlbmRvckNodW5rUGx1Z2luKCksXG4gICAgXSxcbiAgICB0ZXN0OiB7XG4gICAgICBnbG9iYWxzOiB0cnVlLFxuICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgICBzZXR1cEZpbGVzOiBbJ3NyYy90ZXN0LXNldHVwLnRzJ10sXG4gICAgICBpbmNsdWRlOiBbJyoqLyouc3BlYy50cyddLFxuICAgICAgcmVwb3J0ZXJzOiBbJ2RlZmF1bHQnXSxcbiAgICB9LFxuICAgIGRlZmluZToge1xuICAgICAgJ2ltcG9ydC5tZXRhLnZpdGVzdCc6IG1vZGUgIT09ICdwcm9kdWN0aW9uJyxcbiAgICB9LFxuICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsT0FBTyxZQUFZO0FBQ25CLFNBQVMsY0FBc0IsOEJBQThCO0FBQzdELFNBQVMscUJBQXFCO0FBSjlCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxJQUVWLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLHNCQUFzQjtBQUFBLE1BQ3RCLFFBQVEsQ0FBQyxRQUFRO0FBQUEsSUFDbkI7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLElBQUk7QUFBQSxRQUNGLE9BQU8sQ0FBQyxHQUFHO0FBQUEsTUFDYjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUVQLE9BQU87QUFBQSxRQUNMLE1BQU07QUFBQSxVQUNKLHVCQUF1QjtBQUFBLFFBQ3pCO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFFRCxjQUFjO0FBQUEsTUFDZCx1QkFBdUI7QUFBQSxJQUN6QjtBQUFBLElBQ0EsTUFBTTtBQUFBLE1BQ0osU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsWUFBWSxDQUFDLG1CQUFtQjtBQUFBLE1BQ2hDLFNBQVMsQ0FBQyxjQUFjO0FBQUEsTUFDeEIsV0FBVyxDQUFDLFNBQVM7QUFBQSxJQUN2QjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sc0JBQXNCLFNBQVM7QUFBQSxJQUNqQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
