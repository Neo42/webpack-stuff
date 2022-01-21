const {merge} = require('webpack-merge')
const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const MyWebpackPlugin = require('./build-utils/MyWebpackPlugin')
const presetConfig = require('./build-utils/loadPresets')
const modeConfig = (mode) => require(`./build-utils/webpack.${mode}`)

module.exports = ({mode = 'production', presets}) => {
  return merge(
    {
      entry: {
        index: path.join(__dirname, 'src', 'index.js'),
        another: path.join(__dirname, 'src', 'another.js'),
      },
      mode: 'none',
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
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
              'style-loader',
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
          {
            test: /\.js$/,
            use: [
              'thread-loader',
              {
                loader: 'babel-loader', // 'babel-loader?cacheDirectory'
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                },
              },
            ],
            include: path.join(__dirname, 'src'),
          },
          {
            test: /\.(jpe?g|png)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 8021,
                outputPath: `images`,
              },
            },
          },
        ],
      },
      optimization: {
        minimizer: [new CssMinimizerPlugin()],
      },
      output: {
        chunkFilename: '[name].lazy-chunk.js',
        path: path.join(__dirname, 'build'),
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, 'src', 'index.html'),
          filename: 'index.html',
          chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
          template: path.join(__dirname, 'src', 'another.html'),
          filename: 'another.html',
          chunks: ['another'],
        }),
        new MyWebpackPlugin(),
      ],
      resolveLoader: {
        alias: {
          'my-loader': require.resolve('./build-utils/my-loader.js'),
        },
      },
    },
    modeConfig(mode),
    presetConfig({mode, presets}),
  )
}
