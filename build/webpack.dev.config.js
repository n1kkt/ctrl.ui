const resolve = (dir) => require("path").join(__dirname, '..', dir)

const merge = require('webpack-merge')
const pkginfo = require('../package.json')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig, {
	output: {
		path: resolve(pkginfo.distFolder),
		filename: pkginfo.name + '.js'
	},
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
	/*plugins: [
		new HtmlWebpackPlugin({
			template: resolve('examples/index.html'),
			filename: 'index.html',
			inject: 'body'
		})
	]*/
})
