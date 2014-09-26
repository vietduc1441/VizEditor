define(["angular",
    "directives/layout/vizSheetConfig",
    "services/ChartData"
    ],function(angular){
    angular.module("vizDirectives.layout.vizReportLayout",["vizDirectives.layout.vizSheetConfig","DataExtractor"])
            .directive('vizReportLayout', function () {
               return {
                       restrict: "EA",
                       scope:{
                           sheet:'='
                       },
                       controller: ["$scope","GetLineChartData", function($scope, getLineChartData){
                            function insertChart(sourceType, atPos, extractProps){
                                $scope.sheet.widgets.push(angular.extend({id:null, 
                                                        type: sourceType, 
                                                        x: atPos.x, 
                                                        y: atPos.y},
                                                        extractProps));
                            }
                            $scope.onDrop = function(source,target,mouseEvent){
                                var extractProps= getLineChartData($scope.sheet.data);
                                var sourceType = source.getAttribute('viztype'),
                                    dropPosition =   {x:mouseEvent.offsetX,
                                                       y:mouseEvent.offsetY};
                                $scope.$apply(insertChart(sourceType,dropPosition,extractProps));
                            };
                       }],
                       templateUrl: "widget/module/template/layout/vizReportLayout_tpl.html"
               };
            });            
});