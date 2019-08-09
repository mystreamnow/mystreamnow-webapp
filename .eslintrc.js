module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'comma-dangle': 0,
    'react/jsx-uses-vars': 1,
    'react/display-name': 1,
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false }
    ],
    'no-console': 0,
    'no-unexpected-multiline': 'warn',
    'react/prop-types': [0, { ignore: [], customValidators: [] }],
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
    'no-fallthrough': ['error', { commentPattern: 'break[\\s\\w]*omitted' }]
  }
};
