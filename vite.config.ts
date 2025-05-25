import vue                  from "@vitejs/plugin-vue";
import { dirname, resolve } from "node:path";
import { fileURLToPath }    from "node:url";
import { defineConfig }     from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  return {
    plugins: [
      vue()
    ],
    build: isBuild ?
      {
        // cssCodeSplit: true,
        lib: {
          cssFileName: "vue-resize-container",
          // entry: {
          //   index: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
          //   style: fileURLToPath(new URL("./src/assets/styles/style.css", import.meta.url))
          // },
          entry: resolve(__dirname, "./src/index.ts"),
          name: "VueResizeContainer",
          formats: ["es", "umd"],
          fileName: (format, entryName) => {
            switch ( entryName ) {
              case "style":
                return `style.css`;
              default:
                return `vue-resize-container.${ format }.js`;
            }
          }
        },
        rollupOptions: {
          external: ["vue"],
          output: {
            globals: {
              vue: "Vue"
            }
          }
        }
      } :
           undefined,
    resolve: {
      alias: [
        {
          find: "vue-resize-container",
          replacement: resolve("./src")
        }
      ]
    },
    root: isBuild ? undefined : "playground"
  };
});
