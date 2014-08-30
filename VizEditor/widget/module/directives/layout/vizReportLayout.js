define(["angular"],function(angular){
    angular.module("vizDirectives.layout.vizReportLayout",[])
            .directive('vizReportLayout', function () {
               return {
                       restrict: "EA",
                       scope:{
                           sheet:'='
                       },
                       controller: function($scope,$compile){
                            function insertChart(sourceType,atPos){
                                $scope.sheet.widgets.push({id:null,name: sourceType, x: atPos.x, y: atPos.y});
                            }
                            $scope.onDrop = function(source,target,mouseEvent){
                                var sourceType = source.getAttribute('viztype'),
                                    dropPosition =   {x:mouseEvent.offsetX,
                                                       y:mouseEvent.offsetY};
                                $scope.$apply(insertChart(sourceType,dropPosition));
                            };
                       },
                       templateUrl: "widget/module/template/vizReportLayout_tpl.html"
               };
            });            
});