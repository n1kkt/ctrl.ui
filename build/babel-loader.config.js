module.exports = {
  test: /(\.jsx|\.js)$/,
  loader: 'babel-loader',
  exclude: /(node_modules|bower_components)/,
  query: {
    presets: ["env"],
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
      ["istanbul", {
        "exclude": [
          "**/*.spec.js"
        ],
        "useInlineSourceMaps": false
      }]
    ]
  }
}