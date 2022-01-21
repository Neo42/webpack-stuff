const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
  },
  devServer: {
    port: 3000,
    static: path.join(__dirname, 'build'),
    open: true,
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development'),
    }),
  ],
}
