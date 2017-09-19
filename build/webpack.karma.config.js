const pkginfo = require('../package.json')
const path = require("path")
const resolve = dir => path.resolve(path.join(__dirname, '..', dir))

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

const babelLoaderConfig = require('./babel-loader.config')

babelLoaderConfig.query.plugins.push([
  "istanbul", {
    "exclude": [
      "**/*.spec.js"
    ],
    "useInlineSourceMaps": false
  }
])

module.exports = config = merge.smart(baseWebpackConfig, {
  devtool: "inline-source-map",
  module: {
    loaders: [babelLoaderConfig] // this should override babel-loader in base config
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('test'),
      'process.env.BABEL_ENV': JSON.stringify('test'),
    })
  ],
})