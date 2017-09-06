const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = merge( baseWebpackConfig, {
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			sourceMap: true
		}),
		new HtmlWebpackPlugin({
			template: resolve('examples/index.html'),
			filename: 'index.html',
			inject: 'body'
		})
    ],
})
