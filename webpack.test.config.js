const path = require('path')
const buildConfig = require('webpack-vue-typescript-config')

const baseConfig = buildConfig.webpack.buildBaseConfig(
  __dirname,
  path.resolve(__dirname, 'src/index.ts'),
  path.resolve(__dirname, 'dist')
)

module.exports = buildConfig.webpack.buildTestConfig(baseConfig)