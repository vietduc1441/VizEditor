define(["angular",
        "constants/dictShapeType",
        "lib/angular-bootstrap/ui-bootstrap-tpls.min",
        "lib/lvl-drag-drop",
        "lib/lvl-uuid"],function(angular){
            angular.module("vizDirectives.layout.vizToolBox",[
                                                            "vizDirectives.constant.dictShapeType",
                                                            "ui.bootstrap",
                                                            "lvl.directives.dragdrop"
                                                            ])
           .directive('vizToolbox',['dictShapeType',function(dictShapeType){
            return{
                restrict: "EA",
                scope: {},
                controller: function($scope){
                    $scope.charts=[];
                    $scope.shapes=[];
                    $scope.charts.push({
                        chartname:'LineChart',
                        imgsrc:'widget/icons/linechart.png',
                        viztype: dictShapeType.LINE_CHART
                    });
                    $scope.charts.push({
                        chartname:'PieChart',
                        imgsrc:'widget/icons/piechart.png',
                        viztype: dictShapeType.PIE_CHART
                    });
                    $scope.shapes.push({
                        shapename: 'Line',
                        imgsrc:'widget/icons/line.png'
                    });

                    $scope.shapes.push({
                        shapename: 'Rectangular',
                        imgsrc:'widget/icons/rectangular.png'
                    });
                },
                templateUrl: "widget/module/template/vizToolbox_tpl.html"
            };
        }]);
});