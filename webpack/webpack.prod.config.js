const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

const {
  output,
  resolve,
  modules,
  plugins,
  s3Config,
} = require("./webpack.common");

module.exports = {
  mode: "production",
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
