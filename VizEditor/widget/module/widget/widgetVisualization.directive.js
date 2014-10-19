"use strict";
define(["angular",
    "utils/utils.module",
    "vizProviders",
    "services/widgetData"
    ],
    function(angular){
        angular.module('vizDirectives.widget.visualization', [
                                        'utils'
                                        ])
        .directive('visualization', function(changeMonitor){
            function loadTemplateAndConfigChart(scope, widget, chart, atNode){
                require(["charts/"+widget.type],
                        function(VizChart){                        
                            chart= VizChart[widget.type].create();
                            chart.config({xAxis:widget.x_title, 
                                        yAxis: widget.y_title,
                                        label: widget.label,
                                        value: widget.value});
                            chart.setData(widget.data, 
                                        widget.selected_series, 
                                        widget.selected_categories&&widget.selected_categories[0], 
                                        widget.category_need_sorted);
                            chart.render(atNode);
                            scope.$watch('widget.width+widget.height',function(){
                                chart.resize();
                                scope.chartstyle={
                                    width: widget.width+'px',
                                    height: widget.height+'px'
                                    };
                                });
                            scope.$watchCollection(
                                changeMonitor.getWatchColObj,//any change in config
                                function(){
                                    if(widget.data&&chart){
                                        chart.setData(widget.data, widget.selected_series, widget.selected_categories&&widget.selected_categories[0], widget.category_need_sorted);
                                        chart.render(atNode);
                                    }
                                    else{

                                    };
                            });
                            scope.$digest();
                        });
                    };
            return{
                restrict: 'EA',
                scope: {
                    widget:"="
                },
                controller: function($scope){
                    var widget=$scope.widget;
                    $scope.chartstyle={
                        width: widget&&widget.width||200+'px',
                        height: widget&&widget.height||200+'px'
                    };

                },
                link: function(scope, element, attrs, ctr){
                    var chart=null;
                    scope.$watch("widget.type",function(oldVal,newVal, scope){
                            if (!oldVal) return;
                            loadTemplateAndConfigChart(scope, scope.widget, chart, element.find("svg")[0]);
                    });
                },
                template: "<div ><svg ng-style='chartstyle'></svg></div>"
            };
        });                          
    });