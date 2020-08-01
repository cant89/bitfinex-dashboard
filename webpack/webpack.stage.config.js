const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

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
  mode: "development",
  devtool,
  entry,
  output,
  resolve,
  module: modules,
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
