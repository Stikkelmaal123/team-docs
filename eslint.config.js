import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import pluginVitest from "@vitest/eslint-plugin";
import pluginCypress from "eslint-plugin-cypress/flat";

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,jsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: [
      "**/dist/**", // Build output
      "**/dist-ssr/**", // Server-side rendered build output
      "**/coverage/**", // Test coverage reports
      "**/node_modules/**", // Dependencies
      "**/build/**", // Build folder
      "**/*.min.js", // Minified JavaScript files
      "**/.cache/**", // Cache files
      "**/temp/**", // Temporary files
      "**/.env", // Environment variables
      "**/.env.*", // Environment variables with extensions
      "**/*.log", // Log files
      "**/.vscode/**", // VSCode settings
      "**/.idea/**", // IntelliJ IDEA settings
      "**/cypress/videos/**", // Cypress videos
      "**/cypress/screenshots/**", // Cypress screenshots
      "**/cypress/fixtures/**", // Cypress fixtures
      "**/cypress/support/**", // Cypress support files
      "**/test-output/**", // Test output
      "**/reports/**", // Reports
      "**/*.generated.*", // Generated files
      "**/*.bak", // Backup files
      "**/*.config.*", // Configuration files
    ],
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],

  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"],
  },

  {
    ...pluginCypress.configs.recommended,
    files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}", "cypress/support/**/*.{js,ts,jsx,tsx}"],
  },

  {
    rules: {
      "comma-dangle": ["error", "always-multiline"],
      eqeqeq: ["error", "always"],
      indent: ["error", 2],
      "no-eval": ["error"],
      "no-trailing-spaces": ["error"],
      "no-unused-vars": ["error"],
      "no-var": ["error"],
      "prefer-const": ["error"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      complexity: ["warn", { max: 20 }],
      "no-param-reassign": ["error"],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "vue/component-name-in-template-casing": ["error", "PascalCase"],
      "vue/no-unused-components": ["error"],
    },
  },
];
