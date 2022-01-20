const {merge} = require('webpack-merge')

const applyPresets = ({presets}) => {
  const mergedPresets = [...[presets]]
  const mergedConfigs =
    presets && presets.length
      ? mergedPresets.map((presetName) =>
          require(`./presets/webpack.${presetName}`),
        )
      : []

  return merge({}, ...mergedConfigs)
}

module.exports = applyPresets
