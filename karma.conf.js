module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: ['jasmine','requirejs'],

    // list of files / patterns to load in the browser
    files: [
		'./VizEditor/widget/lib/require/require.js',		
		
		{pattern:"./VizEditor/widget/module/**/*.js", included: false},//source files
		{pattern:"./Unit Test/angular-mocks.js", included: false},//test files
		{pattern:"./Unit Test/widget/module/*.test.js", included: false},//test files
		{pattern:"./VizEditor/widget/css/*.less", included: false},//less files
		{pattern:"./VizEditor/widget/module/template/*.html", included: false},//template html
		"./Unit Test/test-main.js",//mai test
	],

    // list of files to exclude
    exclude: [
			"./VizEditor/widget/main.js"
    ],

    // possible values: 'dots', 'progress'
    // CLI --reporters progress
    reporters: ['progress', 'junit'],

    junitReporter: {
      // will be resolved to basePath (in the same way as files/exclude patterns)
      outputFile: '../test-results.xml'
    },

    // web server port
    // CLI --port 9876
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    // CLI --colors --no-colors
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // CLI --log-level debug
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    // CLI --auto-watch --no-auto-watch
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // CLI --browsers Chrome,Firefox,Safari
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    // CLI --capture-timeout 5000
    captureTimeout: 20000,

    // Auto run tests on start (when browsers are captured) and exit
    // CLI --single-run --no-single-run
    singleRun: false,

    // report which specs are slower than 500ms
    // CLI --report-slower-than 500
    reportSlowerThan: 500,
	preprocessors: {
		'./widget/css/*.less':['less'],
		'./widget/module/template/*.html':['ng-html2js']
	},
	lessPreprocessor: {
		options: {
			path: ['./widget/css'],
			save: true
	  }
	},
	
	ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'VizEditor/',
      // prepend this to the
      prependPrefix: '../',

      // or define a custom transform function
      //cacheIdFromPath: function(filepath) {
        //return 'VizEditor';
      //},

      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      moduleName: 'vizDirectives'
    },

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
	  'karma-less-preprocessor',
	  'karma-junit-reporter',
      'karma-commonjs',
	  'karma-requirejs',
	  'karma-ng-html2js-preprocessor'
    ]
  });
};
