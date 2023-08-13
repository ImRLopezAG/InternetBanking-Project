module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "space-before-function-paren": "off",
    "@typescript-eslint/space-before-function-paren": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "key-spacing": "error",
    "brace-style": "off",
    "@typescript-eslint/brace-style": "error",
    "indent": ["error", 2],
  },
}
