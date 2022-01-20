class MyWebpackPlugin {
  apply(compiler) {
    compiler.hooks.done.tapAsync('MyWebpackPlugin\n', (stats, callback) => {
      const assetNames = []
      for (const assetName in stats.compilation.assets) {
        assetNames.push(assetName)
      }
      console.log(assetNames)
      callback()
    })
    compiler.hooks.compilation.tap('MyWebpackPlugin', (compilation, params) => {
      console.log(compilation)
      compilation.hooks.seal.tap('MyWebpackPlugin', () => {
        debugger
      })
    })
  }
}

module.exports = MyWebpackPlugin
