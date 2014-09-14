require.config({
    baseUrl: 'widget/module',
	paths: {
		"angular": '../lib/angular/angular',
		"ui-bootstrap": '../lib/angular-bootstrap/ui-bootstrap',
		"underscore": '../lib/underscore/underscore',
                "d3":'../lib/d3/d3.min',//dont need to use shim for underscore and d3 as it register as amd module with a module name
                "mxLib":'../lib/mxgraph/mxClient',
                "lib":'../lib',
                "nvd3":'../lib/nvd3/nv.d3',
                "jquery":['http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
                            '../lib/jquery/dist/jquery.min'],
        //        "angular-nvd3":'../lib/angularjs-nvd3-directives'
	},
	shim: {
		'angular' : {'exports' : 'angular'},
                'nvd3':{'exports':'nv',
                        "deps":['d3']
                        },
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
		"angular",
                "jQuery"
	]
});
window.name = "NG_DEFER_BOOTSTRAP!";
require(["angular","underscore","d3","vizApp"],function(angular,underscore,d3,vizApp){
    var $html = angular.element(document.getElementsByTagName('html')[0]);
	angular.element().ready(function() {
		angular.resumeBootstrap([vizApp['name']]);
	});
});