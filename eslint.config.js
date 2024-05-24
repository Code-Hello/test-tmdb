import path from 'path';
import { fileURLToPath } from 'url';
import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import unsusedImportPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';
import prettier from 'prettier';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config(
  // Global configs
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // Global ignore, replace .eslintignore
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/public/**',
      '**/*.{html,css}',
    ],
  },

  // Base config
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
    languageOptions: {
      globals: { ...globals.es2020, ...globals.node, ...globals.browser },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      ['@typescript-eslint']: tseslint.plugin,
      ['import']: importPlugin,
      ['jsx-a11y']: jsxA11yPlugin,
      ['react']: reactPlugin,
      ['react-hooks']: reactHooksPlugin,
      ['react-refresh']: reactRefreshPlugin,
      ['unused-imports']: unsusedImportPlugin,
      prettier,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
          },
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },

  // js,jsx files overrides
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parserOptions: {
        project: false,
      },
    },
    ...tseslint.configs.disableTypeChecked,
  },
);
