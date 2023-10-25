/** @type {import('eslint').Linter.Config'} */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': ['error', 'always'],
  },
  settings: {
    tailwindcss: {
      callees: ['cn'],
    },
  },
};
