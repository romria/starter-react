const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');

module.exports = {
  target: 'web',
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    assetModuleFilename: 'static/[name][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/i,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.svg/i,
        type: 'asset/inline'
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/i,
        generator: {
          filename: './fonts/[name][ext][query]'
        }
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    }),
    new RobotstxtPlugin({}), // Options: https://github.com/itgalaxy/generate-robotstxt
    new WebpackManifestPlugin({}) // Options: https://github.com/shellscape/webpack-manifest-plugin#options
  ]
}