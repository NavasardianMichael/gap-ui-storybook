import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { resolve, relative } from "node:path";
import fs from "node:fs";
import dts from "vite-plugin-dts";
import { transformSync } from "esbuild";
import postcss from "postcss";

// Helper to find all files in a directory
function getFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      // Exclude demo folder and the root fonts folder (which is copied manually)
      if (file === "demo") return;
      if (filePath === path.resolve(__dirname, "src/fonts")) return;

      getFiles(filePath, fileList);
    } else {
      if (/\.(ts|tsx|js|jsx|css)$/.test(file)) {
        fileList.push(filePath);
      }
    }
  });
  return fileList;
}

// PostCSS plugin to prefix class names and CSS variables
const prefixPostCssPlugin = (options: { prefix: string }) => {
  return {
    postcssPlugin: "prefix-class-name",
    Rule(rule: any) {
      rule.selector = rule.selector.replace(
        /\.([a-zA-Z_][\w-]*)/g,
        (match: string, className: string) => {
          if (className.startsWith(options.prefix)) return match;
          return `.${options.prefix}${className}`;
        }
      );
    },
    Declaration(decl: any) {
      // Prefix variable declarations: --my-var: value
      if (decl.prop.startsWith("--")) {
        if (!decl.prop.startsWith(`--${options.prefix}`)) {
          decl.prop = `--${options.prefix}${decl.prop.substring(2)}`;
        }
      }
      // Prefix variable usage: var(--my-var)
      if (decl.value.includes("var(--")) {
        decl.value = decl.value.replace(
          /var\(--([a-zA-Z0-9-_]+)\)/g,
          (match: string, varName: string) => {
            if (varName.startsWith(options.prefix)) return match;
            return `var(--${options.prefix}${varName})`;
          }
        );
      }
    },
  };
};
prefixPostCssPlugin.postcss = true;

// Plugin to copy fonts and minify kit.css
const copyFontsPlugin = () => {
  return {
    name: "copy-fonts",
    closeBundle: async () => {
      const srcFonts = resolve(__dirname, "src/fonts");
      const destFonts = resolve(__dirname, "dist/lib/fonts");

      if (fs.existsSync(srcFonts)) {
        // Recursive copy
        fs.cpSync(srcFonts, destFonts, { recursive: true, force: true });

        // Minify kit.css files
        const processDir = async (dir: string) => {
          const entries = fs.readdirSync(dir, { withFileTypes: true });
          for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
              await processDir(fullPath);
            } else if (entry.name === "kit.css") {
              try {
                const css = fs.readFileSync(fullPath, "utf-8");
                // Prefix classes
                const result = await postcss([
                  prefixPostCssPlugin({ prefix: "gap-ui-kit_" }),
                ]).process(css, { from: fullPath });
                // Minify
                const { code } = transformSync(result.css, {
                  loader: "css",
                  minify: true,
                });
                fs.writeFileSync(fullPath, code);
              } catch (e) {
                console.error(`[copy-fonts] Failed to process ${fullPath}`, e);
              }
            }
          }
        };

        await processDir(destFonts);
        console.log(
          "[copy-fonts] Fonts copied, prefixed, and kit.css minified"
        );
      }
    },
  };
};

// Plugin to prevent Vite from processing/inlining font URLs
const preventFontInliningPlugin = () => {
  return {
    name: "prevent-font-inlining",
    enforce: "pre" as const,
    transform(code: string, id: string) {
      if (id.endsWith(".css")) {
        // Replace relative font paths with a placeholder to prevent Vite processing
        const newCode = code.replace(
          /url\s*\(\s*["']?(\.\.\/\.\.\/fonts\/)([^"']+)["']?\s*\)/g,
          () => `url("/__FONTS_PLACEHOLDER__/$2")`
        );
        return newCode;
      }
    },
    generateBundle(_options: unknown, bundle: Record<string, unknown>) {
      for (const fileName in bundle) {
        const chunk = bundle[fileName] as {
          type: string;
          source?: string | Uint8Array;
        };
        if (
          chunk.type === "asset" &&
          fileName.endsWith(".css") &&
          typeof chunk.source === "string"
        ) {
          // Revert the placeholder to the original relative path
          const source = chunk.source;
          chunk.source = source.replace(
            /url\s*\(\s*["']?\/__FONTS_PLACEHOLDER__\/([^"']+)["']?\s*\)/g,
            () => `url("../../fonts/$1")`
          );
        }
      }
    },
  };
};

export default defineConfig(({ mode }) => {
  const isLibMode = mode === "lib";

  if (isLibMode) {
    const files = getFiles(resolve(__dirname, "src"));
    const entries = files.reduce((acc, file) => {
      const relativePath = relative(resolve(__dirname, "src"), file);
      const entryName = relativePath.replace(/\.(ts|tsx|js|jsx|css)$/, "");
      acc[entryName] = file;
      return acc;
    }, {} as Record<string, string>);

    return {
      css: {
        postcss: {
          plugins: [prefixPostCssPlugin({ prefix: "gap-ui-kit_" })],
        },
      },
      plugins: [
        react(),
        dts({
          include: ["src"],
          exclude: ["src/demo"],
          outDir: "dist/lib",
          copyDtsFiles: true,
        }),
        copyFontsPlugin(),
        preventFontInliningPlugin(),
      ],
      build: {
        outDir: "dist/lib",
        emptyOutDir: true,
        sourcemap: true,
        lib: {
          entry: entries,
          formats: ["es"],
        },
        rollupOptions: {
          external: ["react", "react-dom", "react/jsx-runtime"],
          output: {
            preserveModules: true,
            preserveModulesRoot: "src",
            entryFileNames: "[name].js",
          },
        },
        cssCodeSplit: true,
        copyPublicDir: false,
        assetsInlineLimit: 0,
      },
    };
  }

  // 🎨 DEMO APP (dev & demo build)
  return {
    plugins: [react(), tailwindcss()],
    root: "src/demo",
    build: {
      outDir: path.resolve(__dirname, "dist/demo"),
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        "@kit-lib": path.resolve(__dirname, "src"),
        "@kit-styles": path.resolve(__dirname, "src/styles"),
        "@navasardianmichael/gap-ui-storybook": path.resolve(__dirname, "src"),
      },
    },
    server: {
      port: 5179,
      open: true,
    },
  };
});
