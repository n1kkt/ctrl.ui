const pkginfo = require('../package.json')
const path = require("path")
const resolve = dir => path.resolve(path.join(__dirname, '..', dir))

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

const babelLoaderConfig = require('./babel-loader.config')

// istanbul worked, together with karma-coverage-istanbul-reporter
// but it did not save reports while being run from Webstorm test runner
/*babelLoaderConfig.query.plugins.push([
  "istanbul", {
    "exclude": [
      "**!/!*.spec.js",
      "**!/!*.test.js",
      "test/!**!/!*",
    ],
    "useInlineSourceMaps": false
  }
])*/

babelLoaderConfig.query.plugins.push("__coverage__")

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