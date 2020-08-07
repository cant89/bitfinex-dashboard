const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const {
  devtool,
  entry,
  output,
  resolve,
  modules,
  plugins,
  devServer
} = require('./webpack.common');

if (process.env.NODE_ENV === 'BUNDLE_ANALYZER') {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  mode: 'development',
  devtool,
  entry,
  output,
  resolve,
  devServer,
  module: modules,
  plugins: [
    ...plugins,
    new webpack.DefinePlugin({
      API_BASE_URL: {
        BITFINEX_PUBLIC_WS: JSON.stringify('wss://api-pub.bitfinex.com/ws/2')
      },
      'process.env': {}
    })
  ]
};
