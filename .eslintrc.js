module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['standard', 'prettier/standard', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/jsx-uses-react': 1,
    'prettier/prettier': 'error'
  }
}
