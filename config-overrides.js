// @flow
const rewireEslint = require('react-app-rewire-eslint');
const webpack = require('webpack');

// $FlowFixMe
module.exports = function override(config, env) {
  config.module.loaders[
    config.module.loaders.findIndex(l => l.loader === 'babel')
  ].query.plugins = [['transform-react-jsx', { pragma: 'cxsReact' }]];
  config.eslint.configFile = `${__dirname}/.eslintrc.webpack.js`;
  const __DEV__ = env !== 'production';
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
        BLUEBIRD_DEBUG: JSON.stringify(0),
        BLUEBIRD_WARNINGS: JSON.stringify(0),
        BLUEBIRD_LONG_STACK_TRACES: JSON.stringify(0),
      },
      __DEV__: JSON.stringify(__DEV__),
      __PROD__: JSON.stringify(!__DEV__),
      __WEB__: JSON.stringify(true),
      __APP__: JSON.stringify(false),
    })
  );
  config = rewireEslint(config, env);
  return config;
};
