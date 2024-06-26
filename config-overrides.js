const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = function override(config, env) {
  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: './src/service-worker.js',
        swDest: 'service-worker.js',
      })
    );
  }

  return config;
};
