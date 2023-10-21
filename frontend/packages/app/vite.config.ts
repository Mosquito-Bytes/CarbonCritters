import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		assetsDir: "CarbonCritters/assets"
	},
	plugins: [react()],
});
