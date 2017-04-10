module.exports = {
  extends: 'marudor',
  parserOptions: {
    ecmaVersion: 7,
  },
  env: {
    browser: true,
    node: true,
  },
  globals: {
    module: false,
    __DEV__: false,
    __PROD__: false,
    require: false,
    global: false,
  },
  rules: {
    'no-return-assign': 0,
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    //'react/jsx-first-prop-new-line': [2, 'multiline-multiprop'],
    'no-empty-function': 0,
    //not included in CRA eslint version u_U
    'no-compare-neg-zero': 0,
    'nonblock-statement-body-position': 0,
  },
};
