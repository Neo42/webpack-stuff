const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const webpack = require('webpack')

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].[contenthash:8].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash:8].css',
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify('production'),
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    // splitChunks: {
    //   chunks: 'all',
    //   cacheGroups: {
    //     vendor: {
    //       name: 'vendor',
    //       priority: 1,
    //       test: /node_modules/,
    //       minSize: 0,
    //       minChunks: 1,
    //     },
    //     common: {
    //       name: 'common',
    //       priority: 0,
    //       minSize: 0,
    //       minChunks: 2,
    //     },
    //   },
    // },
  },
}
