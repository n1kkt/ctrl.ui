var webpack = require('karma-webpack');
var webpackconfig = require('./webpack.karma.config')

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    // list of files / patterns to load in the browser
    files: [
      'test/**/*.test.js',
    ],
  
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', /*'Firefox', 'Safari', 'Opera'*/],
    // list of files to exclude
    exclude: [],
    plugins:[ webpack, 'karma-jasmine', 'karma-chrome-launcher',
      // 'karma-coverage',
      // 'karma-spec-reporter',
    ],
    
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/tests.js': ['webpack'],
      // 'es2015/**/*.js': ['webpack'],
      // 'es2015/controls/folder/*.test.js': ['webpack'],
      // 'es2015/controls/folder/*.js': ['webpack'],
    
      'test/*.test.js': ['webpack']
    },
    
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],
    // TODO: add coverage
    /*reporters: [ 'spec', 'coverage' ],
    coverageReporter: {
      dir: '../coverage',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
      ]
    },*/
    
    webpack: webpackconfig,
    webpackServer: { noInfo: true },
  
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,
    
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 1, //Infinity,
  
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    
  })
}
