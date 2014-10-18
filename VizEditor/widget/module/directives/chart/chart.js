"use strict";
define(["angular",
    "directives/utils/utils",
    "directives/chart/chart.visualization",
    "directives/chart/chart.config",
    "services/widgetData"
    ],
    function(angular){
        angular.module('vizDirectives.chart', [
                                        'utils',
                                        'vizService',
                                        'vizDirectives.chart.config',
                                        'vizDirectives.chart.visualization'
                                        ])
        .directive('ngChart',function(){
                    return{
                        restrict:'EA',   
                        scope:{
                            widgetId:"@id",
                            data:"@data"
                        },
                        controller: function($scope, widgetData){
                            var widget,
                                originalWidth=0,
                                originalHeight=0;
                            $scope.widgetId=-1;
                            $scope.$watch("widgetId",function(oldVal, newVal, scope){
                                if (newVal===-1) return;
                                widgetData.getWidgetById(parseInt(scope.widgetId)).then(function(result){
                                    scope.widget=result[0];
                                    scope.widget.data=scope.data;
                                    widget= scope.widget;
                                    originalWidth=widget.width,
                                    originalHeight=widget.height;
                                });
                            });

                            $scope.resizing=function(offsetWidth, offsetHeight){
                                widget.height=originalHeight+offsetHeight;
                                widget.width=originalWidth+offsetWidth;
                            };  
                            $scope.setNewSize=function(offsetWidth, offsetHeight){
                                originalHeight+=offsetHeight;
                                originalWidth+=offsetWidth;
                            };
                        },
                        templateUrl:"widget/module/directives/chart/vizChart_tpl.html"
                    };
                });                                      
    });