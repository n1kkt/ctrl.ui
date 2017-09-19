const webpack = require('karma-webpack');
const webpackconfig = require('./webpack.karma.config')
const path = require('path')

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
    plugins:[
      webpack,
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-coverage-istanbul-reporter',
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
    reporters: [
      'progress',
      //'coverage',
      'coverage-istanbul',
    ],
    coverageReporter: {
      type : 'html',
      dir : 'test/coverage/',
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
        //'lcov',
        //'lcovonly',
        //'none',
        //'teamcity',
        //'text-lcov',
        'text-summary',
        'text',
      ],
      dir: path.join(__dirname, '../test/coverage'),
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: false,
      'report-config': {
        'html': { subdir: 'html' },
        'text': { file: 'text.txt' },
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
