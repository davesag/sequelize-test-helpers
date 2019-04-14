// includes mocha plugins and env here because the code is
// designed to run in a mocha context
module.exports = {
  extends: ['standard', 'prettier', 'prettier/standard'],
  plugins: ['prettier', 'standard', 'import', 'promise', 'mocha'],
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, semi: false }],
    'no-unused-expressions': 0
  }
}
