import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        globals: true,
        environment: "node",
        include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        exclude: ["**/node_modules/**", "**/dist/**"],
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            exclude: [
                "coverage/**",
                "dist/**",
                "**/node_modules/**",
                "**/*.d.ts",
                "**/*.test.*",
                "**/*.config.*",
            ],
        },
        setupFiles: ["./vitest.setup.ts"],
    },
});
