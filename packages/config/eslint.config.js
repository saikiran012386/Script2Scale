/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    ignores: [".next/*", "dist/*", "node_modules/*", "src/generated/*"]
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off"
    }
  }
];
