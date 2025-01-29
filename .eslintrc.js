module.exports = {
  // Specify that this is the root ESLint configuration file
  root: true,
  // Define the environments where your code will run
  env: {
    node: true,
    es6: true,
    jest: true
  },
  extends: [
    // Extend ESLint with Playwright test rules
    'plugin:playwright/playwright-test',
    // Use ESLint's recommended rules
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  // Define the rules for your code
  rules: {
    // Warn about unused variables
    'no-unused-vars': 'warn',
    // Warn about console statements
    'no-console': 'warn',
    // Error for undeclared variables
    'no-undef': 'error',
    // Warn about using const instead of let
    'prefer-const': 'warn',
    // Error for using var instead of const or let
    'no-var': 'error',
    // Use single quotes for strings
    quotes: ['error', 'single'],
    // Use 2 spaces for indentation
    indent: ['error', 2],
    // Require or disallow semicolons instead of ASI
    semi: ['error', 'never'],
    'playwright/no-networkidle': 'off'
  }
}
