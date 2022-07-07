/* eslint-disable import/order */
/* eslint-disable no-undef */

const webpack = require('webpack');
const path = require("path");
const CopyFilePlugin = require("copy-webpack-plugin");

const BUILD_ROOT = path.join(__dirname, "./dist");
const SRC_ROOT = path.join(__dirname, "./src");

module.exports = {
  mode: "development",
  context: SRC_ROOT,
  entry: path.resolve("src", "server.ts"),
  target: 'node',
  output: {
    filename: "server.js",
    path: BUILD_ROOT
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.json"
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".ts", ".js", ".json"],
    alias: {
      "@": path.join(__dirname, "/src/")
    }
  },
  plugins: [
    new CopyFilePlugin({
        patterns: [{
          from: path.join(__dirname, "prisma/schema.prisma"),
          to: path.join(__dirname, "dist")
        }]
      })
  ]
};
