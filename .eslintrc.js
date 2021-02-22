module.exports = {
  extends: ['standard', 'plugin:prettier/recommended'],
  plugins: ['import', 'promise', 'mocha'],
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
