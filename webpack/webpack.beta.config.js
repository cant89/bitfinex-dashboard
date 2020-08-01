const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const {
  devtool,
  entry,
  output,
  resolve,
  modules,
  plugins,
  devServer,
  s3Config,
} = require("./webpack.common");

module.exports = {
  mode: "production",
  devtool,
  entry,
  output,
  resolve,
  module: modules,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            inline: false,
          },
        },
      }),
    ],
  },
  devServer,
  plugins: [
    ...plugins,
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new webpack.DefinePlugin({
      API_BASE_URL: {},
      "process.env": {},
    }),
  ],
};
