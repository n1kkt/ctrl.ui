"use strict"
process.env.NODE_ENV = 'production'

const resolve = (dir) => {
  return require("path").join(__dirname, '..', dir)
}
const pkginfo = require('../package.json')

const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')
const runner = require('run-waterfall')

function runBuild(name, config, done) {
  const spinner = ora(`building for ${name}...`)
  spinner.start()
  webpack(config, (err, stats) => {
    spinner.stop()
    if (err) return done && done(err)
    
    console.log(`--- build report : ${name} ---.\n`)
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
    } else {
      console.log(chalk.cyan('  Build complete.\n'))
    }
    
    console.log('\n')
    
    done && done()
  })
}

runner([
    // clear build folder
    next => rm(resolve(pkginfo.distFolder), next),
    // run production build
    next => runBuild('development', require('./webpack.dev.config'), next),
    // run production build
    next => runBuild('production', require('./webpack.prod.config'), next),
  ],
  // on done or err
  err => {
    if (err) throw err
  })