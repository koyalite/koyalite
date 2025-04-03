module.exports = {
  root: true,
  extends: ["eslint-config-koyalite"],
  parser: "@typescript-eslint/parser",
  settings: {
    next: {
      rootDir: ["apps/*/"]
    }
  }
}; 