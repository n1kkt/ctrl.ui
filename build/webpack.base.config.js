const pkginfo = require('../package.json')
const path = require("path")
const resolve = (dir) => {
  return require("path").join(__dirname, '..', dir)
}

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
          //presets: ["es2016", "react"],
          presets: ["env",
            /*{
                "targets": {
                    "browsers": ["last 2 versions", "safari >= 7"]
                }
            }*/
          ],
          plugins: [
            ["transform-react-jsx", {pragma: "h"}],
            "transform-decorators-legacy",
            "transform-class-properties",
            //"transform-es2015-modules-commonjs",
            /*"transform-object-rest-spread",
            ["transform-runtime", {
              polyfill: false,
              regenerator: false
            }]*/
          ]
        }
      },
      {
        test: /\.scss$/,
        loaders: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader",
          options: {
            includePaths: ["style"]
          }
        }, {
          loader: "import-glob-loader",
        }]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "../src"),
      '@@': path.resolve(__dirname, "../src/controls"),
      '#': path.resolve(__dirname, "../style"),
    }
  }
}
