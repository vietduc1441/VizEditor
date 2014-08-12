require.config({
    baseUrl: 'widget/module',
	paths: {
		"angular": '../lib/angular/angular',
		"ui-bootstrap": '../lib/angular-bootstrap/ui-bootstrap',
		"underscore": '../lib/underscore/underscore',
        "d3":'../lib/d3/d3.min',
        "mxLib":'../lib/mxgraph/mxClient',
        "lib":'../lib'
	},
	shim: {
		'angular' : {'exports' : 'angular'},
        'underscore': {exports: 'd_'},
        'mxLib': {exports: 'mxGraph',
                init:function(){
                  return{
                      mxActor: mxActor,
					  mxCell: mxCell,
					  mxClient: mxClient                 
                  };
                }}
    },
	priority: [
		"angular"
	]
});
window.name = "NG_DEFER_BOOTSTRAP!";
require(["angular","underscore","d3","vizApp"],function(angular,underscore,d3,vizApp){
    var $html = angular.element(document.getElementsByTagName('html')[0]);
	angular.element().ready(function() {
		angular.resumeBootstrap([vizApp['name']]);
	});
});