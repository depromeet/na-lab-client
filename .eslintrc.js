module.exports = {
  ignorePatterns: ['.next/', 'node_modules/', '.pnp.cjs', '.pnp.loader.mjs', 'public', '.yarn', '@types'],
  plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports', 'testing-library'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'import/order': 'off',
    'consistent-return': 'off',
    'no-restricted-exports': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'react/react-in-jsx-scope': 'off',

    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],

    'prettier/prettier': 'error',

    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // react > next > @ > a~z
          ['^react$', '^next', '^@', '^[a-z]'],
          // ~
          ['^~'],
          // `../` > './'
          ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Side effect imports
          ['^\\u0000'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '_',
        varsIgnorePattern: '_',
      },
    ],

    'react/button-has-type': 'error',
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: ['label'],
        labelAttributes: ['label'],
        controlComponents: ['StyledHiddenInput'],
        depth: 1,
      },
    ],
  },
};
