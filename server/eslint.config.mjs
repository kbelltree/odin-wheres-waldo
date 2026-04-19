import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import { createRequire } from 'module';

const require = createRequire(import.meta.url); // Create a require function relative to the current file's URL
const prettier = require('eslint-config-prettier');

export default defineConfig([
  {
    ignores: ['node_modules/**', '.env', 'generated/**'],
  },

  js.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        process: 'readonly',
        console: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        ...globals.jest,
      },
    },

    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
    },
  },

  // Treat .mjs files as modules so ESM config files parse correctly
  {
    files: ['**/*.mjs'],
    languageOptions: {
      sourceType: 'module',
    },
  },

  prettier,
]);
