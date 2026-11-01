import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/**', 'cypress/reports/**', 'cypress/screenshots/**',
      'cypress/videos/**', 'cypress/downloads/**'],
  },
  js.configs.recommended,
  {
    files: ['cypress/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.mocha,
        cy: 'readonly',
        Cypress: 'readonly',
        expect: 'readonly',
      },
    },
  },
  {
    files: ['*.js', '*.mjs', 'scripts/**/*.cjs'],
    languageOptions: { globals: globals.node },
  },
];
