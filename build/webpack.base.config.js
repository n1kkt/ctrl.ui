const pkginfo = require('../package.json')
const path = require("path")
const resolve = dir => path.resolve(path.join(__dirname, '..', dir))

const babelLoaderConfig = require('./babel-loader.config')

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
      babelLoaderConfig,
      {
        test: /\.scss$/,
        loaders: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader", options: { includePaths: [resolve("style")] } },
          { loader: "import-glob-loader" }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': resolve("src"),
      '@@': resolve("src/controls"),
      '#': resolve("style"),
    }
  }
}
