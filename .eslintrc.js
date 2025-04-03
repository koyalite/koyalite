module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react", "react-hooks", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        "no-console": ["warn", { allow: ["warn", "error"] }],
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    env: {
        browser: true,
        node: true,
        es2022: true,
    },
    ignorePatterns: ["dist", "node_modules", "*.js", "!.eslintrc.js"],
};
