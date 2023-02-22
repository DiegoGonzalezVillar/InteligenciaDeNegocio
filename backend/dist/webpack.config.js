"use strict";

var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var TerserPlugin = require("terser-webpack-plugin");
module.exports = function (env, argv) {
  var isProduction = argv.mode === "production";
  return {
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.(css|scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: !isProduction
          }
        }, "css-loader", "sass-loader"]
      }]
    },
    plugins: [new HtmlWebpackPlugin({
      template: "./public/index.html"
    }), new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })],
    optimization: {
      minimizer: [new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      }), new OptimizeCSSAssetsPlugin({})]
    },
    devServer: {
      contentBase: "./dist",
      historyApiFallback: true
    }
  };
};