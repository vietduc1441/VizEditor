var allTestFiles = [];
var TEST_REGEXP = /test\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/',
    paths: {
		"angular": 'VizEditor/widget/module/lib/angular/angular',
		"ui-bootstrap": 'VizEditor/widget/module/lib/angular-bootstrap/ui-bootstrap',
		"underscore": 'VizEditor/widget/module/lib/underscore/underscore',
                "d3":'VizEditor/widget/module/lib/d3/d3.min',//dont need to use shim for underscore and d3 as it register as amd module with a module name
                "mxLib":'VizEditor/widget/module/lib/mxgraph/mxClient',
                "lib":'VizEditor/widget/module/lib',
                "nvd3":'VizEditor/widget/module/lib/nvd3/nv.d3',
                "jquery":['http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
                            'VizEditor/widget/module/lib/jquery/dist/jquery.min'],
        //        "angular-nvd3":'../lib/angularjs-nvd3-directives'
	},
  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
