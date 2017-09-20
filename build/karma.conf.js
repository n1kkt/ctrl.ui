const webpack = require('karma-webpack');
const webpackconfig = require('./webpack.karma.config')
const path = require("path")
const resolve = dir => path.resolve(path.join(__dirname, '..', dir))

module.exports = function (config) {
  config.set({
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
    
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: resolve(''),
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine-jquery', 'jasmine'],
    // list of files / patterns to load in the browser
    files: [
      {pattern: 'src/**/*.test.js', watched: false, },
      {pattern: 'test/**/*.test.js', watched: false, },
      //'test/**/*.test.js',
    ],
    // list of files to exclude
    exclude: [
      'test/coverage/*',
      'test/coverage/**/*',
    ],
    plugins:[
      webpack,
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-jquery',
      //'karma-coverage-istanbul-reporter',
      'karma-coverage',
      'karma-spec-reporter',
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      //'test/tests.js': ['webpack'],
      'src/**/*.test.js': ['webpack'],
      
      //'src/**/*.spec.js': ['webpack'],
      // 'es2015/**/*.js': ['webpack'],
      // 'es2015/controls/folder/*.test.js': ['webpack'],
      // 'es2015/controls/folder/*.js': ['webpack'],
    
      'test/*.test.js': ['webpack'],
    },
  
    webpack: webpackconfig,
    webpackServer: { noInfo: true },
  
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', /*'Firefox', 'Safari', 'Opera'*/],
    
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      //'progress',
      'coverage',
      'spec',
      //'coverage-istanbul',
    ],
  
    specReporter: {
      maxLogLines: 5,             // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false,      // do not print information about failed tests
      suppressPassed: false,      // do not print information about passed tests
      suppressSkipped: true,      // do not print information about skipped tests
      showSpecTiming: false,      // print the time elapsed for each spec
      failFast: false              // test would finish with error when a first fail occurs.
    },
    coverageReporter: {
      dir : resolve('test/coverage'),
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
      ],
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },
    coverageIstanbulReporter: {
      reports: [
        //'clover',
        //'cobertura',
        'html',
        'json-summary',
        'json',
        'lcov',
        'lcovonly',
        //'none',
        //'teamcity',
        //'text-lcov',
        'text-summary',
        'text',
      ],
      dir: resolve('test/coverage'),
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: false,
      'report-config': {
        'html': { subdir: 'html' },
        'lcovonly': { file: 'lcov.info' },
        //'text': { file: 'text.txt' },
        //'text-summary': { file: 'text-summary.txt' },
      },
      /*thresholds: {
        emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
        global: { // thresholds for all files
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100
        },
        each: { // thresholds per file
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100,
          overrides: {
            'baz/component/!**!/!*.js': {
              statements: 98
            }
          }
        }
      },*/
    },
  
    
  })
}
