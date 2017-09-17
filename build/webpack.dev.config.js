const resolve = (dir) => require("path").join(__dirname, '..', dir)

const webpack = require('webpack')
const merge = require('webpack-merge')
const pkginfo = require('../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig, {
	entry: resolve('src/devIndex.js'),
	// plugins: [
	//   new webpack.DefinePlugin({
	//     'process.env': {
	//       NODE_ENV: '"production"'
	//     }
	//   })
	// ],
	devServer: {
		contentBase: './examples',
		noInfo: true
	},
	devtool: 'source-map',
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: resolve('examples/devIndex.html'),
			filename: 'index.html',
			inject: 'body'
		}),
		new webpack.DefinePlugin({
            //'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			//'process.env': {NODE_ENV: '"development"'}
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
		}),
        //new webpack.EnvironmentPlugin(['NODE_ENV'])
	]
})
