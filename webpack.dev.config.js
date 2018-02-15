const path = require('path')
const buildConfig = require('webpack-vue-typescript-config')

const baseConfig = buildConfig.webpack.buildBaseConfig(
  __dirname,
  path.resolve(__dirname, 'dev-entry.ts'),
  path.resolve(__dirname, 'dist')
)

const devConfig = buildConfig.webpack.buildDevConfig(baseConfig)

module.exports = buildConfig.webpack.createDevServer(devConfig)