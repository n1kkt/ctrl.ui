const webpack = require('webpack')
const merge = require('webpack-merge')
const pkginfo = require('../package.json')
const baseWebpackConfig = require('./webpack.base.config')
const CompressionPlugin = require("compression-webpack-plugin");
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = merge( baseWebpackConfig, {
	output: {
		filename: pkginfo.name + '.min.js',
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			sourceMap: true
		}),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.(js)$/,
			threshold: 10240,
			minRatio: 0.8,
			deleteOriginalAssets: false
		}),
		new UnminifiedWebpackPlugin({
			/*postfix: 'unmin'//specify "nomin" postfix,
			include: /polyfill.*!/,
			exclude: /test.*!/*/
		})
    ],
})
