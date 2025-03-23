import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	tsr: {
		appDirectory: "src/app",
	},
	server: {
		preset: "bun",
	},
	vite: {
		plugins: [
			tsConfigPaths({
				projects: ["./tsconfig.json"],
			}),
			tailwindcss(),
		],
	},
});
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
// import tailwindcss from '@tailwindcss/vite';
// import { defineConfig } from '@tanstack/react-start/config';
// import react from '@vitejs/plugin-react';
// import viteTsConfigPaths from 'vite-tsconfig-paths';
// // import reactRefresh from "@vitejs/plugin-react-refresh";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export default defineConfig({
//   tsr: {
//     appDirectory: 'src/app',
//     routesDirectory: 'src/app/routes',
//   },
//   server: {
//     srcDir: path.resolve(__dirname, 'src'),
//     routesDir: path.resolve(__dirname, 'src/server/api'),
//   },
//   routers: {},
//   vite: {
//     plugins: [
//       react(),
//       viteTsConfigPaths({
//         projects: ['./tsconfig.json'],
//       }),
//       tailwindcss(),
//     ],
//     resolve: {
//       alias: {
//         '~': path.resolve(__dirname, './src'),
//         app: path.resolve(__dirname, './src/app'),
//       },
//     },
//     build: {
//       manifest: true,
//       ssrManifest: true,
//       ssr: './src/app/ssr.tsx',
//       rollupOptions: {
//         input: path.resolve(__dirname, './src/app/ssr.tsx'),
//         external: ['tsr:routes-manifest'],
//       },
//     },
//   },
// });
