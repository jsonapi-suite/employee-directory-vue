#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const vm = require('vm')
const webpack = require('webpack')
const MemoryFS = require('memory-fs')
const StartServerPlugin = require('start-server-webpack-plugin')
const serverConfig = require('../config/webpack-config-server')
let envs = {}
for (e in process.env) envs[e] = JSON.stringify(process.env[e])

serverConfig.entry = [
  'webpack/hot/poll?1000',
  serverConfig.entry
]

serverConfig.plugins = serverConfig.plugins || []
serverConfig.plugins = serverConfig.plugins.concat([
  new StartServerPlugin(serverConfig.output.filename),
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
      "process.env": Object.assign({}, envs, {
          "BUILD_TARGET": JSON.stringify('server')
      })
  }),
])

serverConfig.output.path = path.join(serverConfig.output.path, '/dev')

// The below is mostly stolen from the `webpack` CLI tool, but we needed more customization that that offers

compiler = webpack(serverConfig)
compiler.outputFileSystem.fs = new MemoryFS()

let outputOptions = serverConfig.stats
let lastHash

if (typeof outputOptions === "boolean" || typeof outputOptions === "string") {
  outputOptions = statsPresetToOptions(outputOptions)
} else if(!outputOptions) {
  outputOptions = {};
}

outputOptions.colors = require("supports-color");
outputOptions.cached = false
outputOptions.cachedAssets = false

function compilerCallback(err, stats) {
  if(err) {
    // Do not keep cache anymore
    compiler.purgeInputFileSystem()

    lastHash = null
    console.error(err.stack || err)
    if (err.details) console.error(err.details)
    process.exit(1); // eslint-disable-line
  }

  if (stats.hash !== lastHash) {
    lastHash = stats.hash;
    var statsString = stats.toString(outputOptions);
    if (statsString)
      process.stdout.write(statsString + "\n");
  }
}

compiler.watch(true, compilerCallback);

module.exports = serverConfig