module.exports = {
  extends: ['next', 'next/core-web-vitals', 'prettier', 'airbnb'],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', '.'],
          ['@/components', './components'],
          ['@/pages', './pages'],
          ['@/styles', './styles'],
          ['@/utils', './utils'],
          ['@/public', './public'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'no-unused-vars': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-alert': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/jsx-one-expression-per-line': [0],
    'no-console': [
      1,
      {
        allow: ['error', 'warn'],
      },
    ],
    'comma-dangle': ['error'],
    'no-debugger': 1,
    'linebreak-style': 0,
    'max-len': [1, 6000, 2],
    'no-plusplus': [
      2,
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'object-curly-newline': 'off',
    'import/order': 'off',
  },
};
