module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  requirePragma: false,
  endOfLine: 'lf',

  plugins: [require('prettier-plugin-tailwindcss')]
}
