const webpack = require('webpack')
const path = require('path')
const pkginfo = require('../package.json')

function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

let config = {
	entry: resolve('src/index.js'),
	devtool: 'source-map',
	output: {
		path: resolve('lib'),
		filename: pkginfo.name + '.js',
		library: pkginfo.name,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		loaders: [
			{test: /\.json$/, loader: "json-loader"},
			{
				test: /(\.jsx|\.js)$/,
				loader: 'babel-loader',
				exclude: /(node_modules|bower_components)/,
				/*query: {
					presets: [/!*"es2015",*!/  'react'],
					plugins: [
						"transform-es2015-modules-commonjs",
						"transform-object-rest-spread",
						["transform-runtime", {
							polyfill: false,
							regenerator: false
						}]
					]
				}*/
			}
		]
	},
	resolve: {
		alias: {
			'@': resolve('src'),
		}
	}
}

module.exports = config;