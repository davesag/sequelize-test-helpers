module.exports = {
  extends: ['standard', 'prettier', 'prettier/standard'],
  plugins: ['prettier', 'standard', 'mocha'],
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
    'no-unused-expressions': 0,
  }
}
