process.env.NODE_ENV = 'production'

let ora = require('ora')
let rm = require('rimraf')
let path = require('path')
let chalk = require('chalk')
let webpack = require('webpack')
let webpackConfig = require('./webpack.build.config')


let spinner = ora('building for production...')
spinner.start()

function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

rm(resolve('lib'), err => {
	if (err) throw err
	webpack(webpackConfig, function (err, stats) {
		spinner.stop()
		if (err) throw err
		process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false
		}) + '\n\n')

		if (stats.hasErrors()) {
			console.log(chalk.red('  Build failed with errors.\n'))
			process.exit(1)
		}

		console.log(chalk.cyan('  Build complete.\n'))
		console.log(chalk.yellow(
			'  Tip: built files are meant to be served over an HTTP server.\n' +
			'  Opening index.html over file:// won\'t work.\n'
		))
	})
})
