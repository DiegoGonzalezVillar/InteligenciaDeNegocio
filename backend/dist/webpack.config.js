"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _webpack = _interopRequireDefault(require("webpack"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _webpackLivereloadPlugin = _interopRequireDefault(require("webpack-livereload-plugin"));

var TerserPlugin = require("terser-webpack-plugin");

var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var _default = {
  entry: './src/index.js',
  target: 'node',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      use: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      use: [MiniCssExtractPlugin.loader, "css-loader"],
      test: /\.css$/
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    }]
  },
  plugins: [new _htmlWebpackPlugin["default"]({
    template: './src/client/index.html'
  }), new _webpackLivereloadPlugin["default"](), new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  })]
};
exports["default"] = _default;