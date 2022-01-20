const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const presetConfig = require('./build-utils/loadPresets')
const modeConfig = (mode) => require(`./build-utils/webpack.${mode}`)
const MyWebpackPlugin = require('./build-utils/MyWebpackPlugin')

const templateContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`

module.exports = ({mode = 'production', presets}) => {
  return merge(
    {
      devServer: {
        port: 3000,
        static: path.join(__dirname, 'build'),
      },
      mode: 'none',
      module: {
        rules: [
          {
            test: /\.js$/,
            use: 'my-loader',
          },
          {
            test: /\.(jpe?g|png)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 8021,
              },
            },
          },
        ],
      },
      output: {
        chunkFilename: '[name].lazy-chunk.js',
        filename: 'bundle.js',
        path: path.join(__dirname, 'build'),
      },
      plugins: [
        new MyWebpackPlugin(),
        new HtmlWebpackPlugin({
          templateContent,
        }),
        new webpack.ProgressPlugin(),
      ],
      resolveLoader: {
        alias: {
          'my-loader': require.resolve('./build-utils/my-loader.js'),
        },
      },
    },
    modeConfig(mode),
    presetConfig({mode, presets}),
    {},
  )
}
