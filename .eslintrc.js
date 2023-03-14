module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true
    },
    extends: [
      "plugin:@typescript-eslint/recommended",
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module'
    },
    plugins: ["unused-imports", '@typescript-eslint'],
    "settings": {
      "react": {
        "version": "detect"
      }
    },
    rules: {
      'quote-props': ['error', 'as-needed', { 'keywords': false, 'unnecessary': false }],
      'no-empty-function': 'off',
      'space-before-function-paren': ['error', 'never'],
      "no-var": 0,
      'lines-between-class-members': 'off',
      'semi': [2, 'never'],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off"
    }
  }
  