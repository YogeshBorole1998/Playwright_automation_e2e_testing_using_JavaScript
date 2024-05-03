module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-undef': 'error',
    'prefer-const': 'warn',
    'no-var': 'error',
    semi: ['error', 'never'],
    indent: ['error', 2],
    quotes: ['error', 'single']
  }
}
