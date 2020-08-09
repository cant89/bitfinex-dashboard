const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcPath = path.resolve(__dirname, '../src/');
const buildPath = path.resolve(__dirname, '../build');
const getSubDirSrcPath = subdir => path.join(__dirname, '../src', subdir);
const { version } = require('../package');
const APP_TITLE = 'Bitfinex App';

module.exports = {
  devtool: 'inline-source-map',
  entry: ['babel-polyfill', srcPath],
  output: {
    path: buildPath,
    filename: `[name]-v${version}.[hash].js`,
    publicPath: '/',
    sourceMapFilename: `[name]-v${version}.[hash].map`
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '#/types': getSubDirSrcPath('types'),
      '#/store': getSubDirSrcPath('store')
    }
  },
  modules: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: 'url-loader?name=/img/[name].[ext]'
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: APP_TITLE,
      inject: true,
      template: 'index.ejs',
      filename: 'index.html'
    }),
    new webpack.ProvidePlugin({
      ESPolyfill: ['event-source-polyfill']
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    overlay: true,
    historyApiFallback: true
  }
};
