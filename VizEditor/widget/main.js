require.config({
    baseUrl: 'widget/module',
	paths: {
		"angular": '../lib/angular/angular',
		"ui-bootstrap": '../lib/angular-bootstrap/ui-bootstrap',
		"underscore": '../lib/underscore/underscore',
        "d3":'../lib/d3/d3.min',
        "mxLib":'../lib/mxgraph/mxClient'
	},
	shim: {
		'angular' : {'exports' : 'angular'},
        'underscore': {exports: '_'},
        'mxLib': {exports: 'mxGraph',
                init:function(){
                  return{
                      mxActor: mxActor,
					  mxCell: mxCell,
					  mxClient: mxClient                 
                  }  
                }}
    },
	priority: [
		"angular"
	]
});
require(["angular","underscore","d3","mxLib"],function(angular,underscore,d3,mxGraph){
    var a= angular;
    var u= underscore;
    var d3= d3;
	var mxc=mxGraph;
})