const webpack = require('webpack')
const merge = require('webpack-merge')
const pkginfo = require('../package.json')
const baseWebpackConfig = require('./webpack.base.config')
const CompressionPlugin = require("compression-webpack-plugin");
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  output: {
    filename: pkginfo.name + '.min.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      //'process.env': {NODE_ENV: '"development"'}
    })
  ],
})
