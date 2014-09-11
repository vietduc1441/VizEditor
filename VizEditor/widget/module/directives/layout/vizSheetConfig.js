define(["angular",        
        "lib/angular-bootstrap/ui-bootstrap-tpls.min"
        ],function(angular){
    angular.module("vizDirectives.layout.vizSheetConfig",["ui.bootstrap"])
            .directive("vizSheetConfig",function(){
                return {
                    restrict: "EA",
                    scope:{
                      sheet: "="  
                    },
                    controller: function($scope){
                    },
                    link: function(scope, elm, attrs, ctr){
                    },
                    templateUrl: "widget/module/template/layout/vizSheetConfig_tpl.html"
                };
            });
            
        
});