const path = require('path');
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: '8000',
    static: {
      directory: path.join(__dirname, 'public')
    },
    open: true,
    hot: true,
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader', // Creates `style` nodes from JS strings
          {
            loader: 'css-loader', // Translates CSS into CommonJS
            options: {
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]'
              },
            }
          },
          {
            loader: 'sass-loader', // Compiles Sass to CSS
            options: {
              implementation: require("sass"), // Explicitly prefer `dart-sass`
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ]
      },
    ]
  }
});
