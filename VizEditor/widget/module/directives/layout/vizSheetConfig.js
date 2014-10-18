define(["angular",        
        "lib/angular-bootstrap/ui-bootstrap-tpls.min",
        "lib/ng-grid/ng-grid-2.0.12.min",
        "directives/utils/utils"
        ],function(angular){
    angular.module("vizDirectives.layout.vizSheetConfig",["ui.bootstrap","utils","ngGrid"])
            .directive("vizSheetConfig",function(){
                return {
                    restrict: "EA",
                    scope:{
                      sheet: "="  
                    },
                    controller: function($scope){
                        $scope.minWidth={"width":"10%"};
                        $scope.maxWidth={"width":"50%"};
                        $scope.width=$scope.minWidth;
                        $scope.toggleWidth=function(){
                            if ($scope.width===$scope.maxWidth){
                                $scope.width=$scope.minWidth;
                            }
                            else{
                                $scope.width=$scope.maxWidth;
                            }
                        };
                        $scope.gridOptions={
                            data: "sheet.data",
                            enableFiltering: true,
                            showFilter: true,
                        };
                    },
                    link: function(scope, elm, attrs, ctr){

                    },
                    templateUrl: "widget/module/directives/layout/vizSheetConfig_tpl.html"
                };
            });
});    
