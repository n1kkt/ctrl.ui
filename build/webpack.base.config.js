const pkginfo = require('../package.json')
const path = require("path")
const resolve = (dir) =>  { return require("path").join(__dirname, '..', dir) }

module.exports = config = {
	entry: resolve('src/index.js'),
	devtool: 'source-map',
	output: {
		path: resolve(pkginfo.distFolder),
		filename: pkginfo.name + '.js',
		library: pkginfo.name,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: "json-loader"
			},
			{
				test: /(\.jsx|\.js)$/,
				loader: 'babel-loader',
				exclude: /(node_modules|bower_components)/,
				query: {
					presets: ["es2015", "react"],
					plugins: [
						["transform-react-jsx", { pragma: "h" }],
						"transform-decorators-legacy",
						//"transform-es2015-modules-commonjs",
						/*"transform-object-rest-spread",
						["transform-runtime", {
							polyfill: false,
							regenerator: false
						}]*/
					]
				}
			}
		]
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, "../src"),
			'@@': path.resolve(__dirname, "../src/components"),

		}
	}
}
