define(["angular","directives/layout/vizSheetConfig"],function(angular){
    angular.module("vizDirectives.layout.vizReportLayout",["vizDirectives.layout.vizSheetConfig"])
            .directive('vizReportLayout', function () {
               return {
                       restrict: "EA",
                       scope:{
                           sheet:'='
                       },
                       controller: function($scope,$compile){
                            function insertChart(sourceType,atPos){
                                $scope.sheet.widgets.push({id:null, type: sourceType, x: atPos.x, y: atPos.y});
                            }
                            $scope.onDrop = function(source,target,mouseEvent){
                                var sourceType = source.getAttribute('viztype'),
                                    dropPosition =   {x:mouseEvent.offsetX,
                                                       y:mouseEvent.offsetY};
                                $scope.$apply(insertChart(sourceType,dropPosition));
                            };
                       },
                       templateUrl: "widget/module/template/layout/vizReportLayout_tpl.html"
               };
            });            
});