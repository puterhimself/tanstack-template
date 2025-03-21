import { defineConfig } from "@tanstack/react-start/config";
import viteTsConfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	tsr: {
		appDirectory: "src/app",
		routesDirectory: "src/app/routes",
		// @ts-ignore: clientManifestPath is used by vinxi to locate the client manifest file
		clientManifestPath: path.resolve(__dirname, "dist", ".vite", "manifest.json"),
	},
	server: {
		srcDir: path.resolve(__dirname, "src"),
		routesDir: path.resolve(__dirname, "src/app/routes"),
	},
	vite: {
		plugins: [
			react(),
			viteTsConfigPaths({
				projects: ["./tsconfig.json"],
			}),
			tailwindcss(),
		],
		resolve: {
			alias: {
				"~": path.resolve(__dirname, "./src"),
				app: path.resolve(__dirname, "./src/app"),
			},
		},
		build: {
			outDir: path.resolve(__dirname, "dist"),
			manifest: true,
			emptyOutDir: true,
			ssr: "src/app/ssr.tsx",
			rollupOptions: {
				input: path.resolve(__dirname, "src/app"),
				external: ["tsr:routes-manifest"],
			},
		},
	},
});
