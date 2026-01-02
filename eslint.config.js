import base from './packages/eslint-config/index.js';

export default [
  // Ignore build and output directories
  { ignores: ['**/dist/**', '**/build/**', '**/coverage/**', '**/.turbo/**'] },
  // Apply base config everywhere
  ...base,
];
