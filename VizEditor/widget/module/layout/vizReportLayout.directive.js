define(["angular",
    "layout/vizSheetConfig.directive",
    "services/ChartData.service",
    "services/generator.service"    
    ],function(angular){
    angular.module("vizDirectives.layout.vizReportLayout",
        ["vizDirectives.layout.vizSheetConfig","DataExtractor","Generator"])
    .directive('vizReportLayout', function () {
       return {
               restrict: "EA",
               scope:{
                   sheet:'='
               },
               controller: ["$scope","getLineChartData","idGenerator", function($scope, getLineChartData, idGen){
                    function insertChart(sourceType, atPos, extractProps){
                        $scope.sheet.widgets.push(angular.extend({
                                                    id: idGen(), 
                                                    type: sourceType, 
                                                    x: atPos.x, 
                                                    y: atPos.y
                                                    },extractProps));
                    }
                    $scope.onDrop = function(source,target,mouseEvent){
                        var extractProps= getLineChartData($scope.sheet.data);
                        var sourceType = source.getAttribute('viztype'),
                            dropPosition =   {x:mouseEvent.offsetX,
                                               y:mouseEvent.offsetY};
                        $scope.$apply(insertChart(sourceType,dropPosition,extractProps));
                    };
               }],
               templateUrl: "widget/module/layout/vizReportLayout_tpl.html"
       };
    });            
});