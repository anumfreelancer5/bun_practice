import js from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '**/*.js'],
  },
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        URL: 'readonly',
      },
    },
    rules: {
      'no-console': 'off', // Allow console in demo files
      'no-useless-escape': 'off',
      'no-redeclare': 'off', // Allow function overloads
      'no-prototype-builtins': 'off',
      'no-undef': 'off', // TypeScript handles this better
      'no-unused-vars': 'off', // TypeScript handles this better with overloads
    },
  },
];
