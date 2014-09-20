define(["angular",
    "directives/layout/vizSheetConfig",
    "charts/ChartData"
    ],function(angular){
    angular.module("vizDirectives.layout.vizReportLayout",["vizDirectives.layout.vizSheetConfig","DataExtractor"])
            .directive('vizReportLayout', function () {
               return {
                       restrict: "EA",
                       scope:{
                           sheet:'='
                       },
                       controller: ["$scope","GetLineChartData", function($scope, getLineChartData){
                            function insertChart(sourceType,atPos){
                                $scope.sheet.widgets.push({id:null, 
                                                        type: sourceType, 
                                                        x: atPos.x, 
                                                        y: atPos.y, 
                                                        data: $scope.sheet.data});
                            }
                            $scope.onDrop = function(source,target,mouseEvent){
                                var extractFunc= getLineChartData();
                                
                                var sourceType = source.getAttribute('viztype'),
                                    dropPosition =   {x:mouseEvent.offsetX,
                                                       y:mouseEvent.offsetY};
                                $scope.$apply(insertChart(sourceType,dropPosition));
                            };
                       }],
                       templateUrl: "widget/module/template/layout/vizReportLayout_tpl.html"
               };
            });            
});