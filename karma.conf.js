// Karma configuration
// Generated on Fri May 13 2016 11:58:44 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'client/lib/angular/angular.js',
      'client/lib/angular-mocks/angular-mocks.js',
      'client/app/dashboard/dashboard.js',
      'client/app/dashboard/sub-views/controllers/goals.js',
      'client/app/fitness/cardio.js',
      'client/app/fitness/cardioModal.js',
      'client/app/fitness/strength.js',
      'client/app/fitness/strengthModal.js',
      'client/app/landing/landing.js',
      'client/app/nutrition/nutrition.js',
      'client/app/nutrition/nutritionModal.js',
      'client/app/profile/profile.js',
      'client/app/signin/signin.js',
      'client/app/signup/signup.js',
      'client/app/social/chat.js',
      'client/app/social/social.js',
      'client/app/app.js',
      'client/app/services/authFactory.js',
      'client/app/services/nutritionFactory.js',
      'client/app/services/profileFactory.js',
      'client/app/services/socialFactory.js',
      'client/app/services/strengthFactory.js',
      'spec/unit-test/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
