"use strict";
define(["angular",
    "directives/utils/utils",
    "vizProviders",
    "directives/layout/layout"
    ],
    function(angular){
        angular.module('vizDirectives', ['utils','vizService','vizDirectives.layout'])
        .directive('ngChart',function(){
            return{
                restrict:'EA',   
                controller: function($scope){
                  var widget= $scope.widget;
                  var originalWidth=widget.width,
                      originalHeight=widget.height;
                    $scope.resizing=function(offsetWidth, offsetHeight){
                        widget.height=originalHeight+offsetHeight;
                        widget.width=originalWidth+offsetWidth;
                    };  
                    $scope.setNewSize=function(offsetWidth, offsetHeight){
                        originalHeight+=offsetHeight;
                        originalWidth+=offsetWidth;
                    };
                },
                templateUrl:"widget/module/template/vizChart_tpl.html"
            };
        })
        .directive('visualization', function(changeMonitor){
            return{
                restrict: 'EA',
                scope: {
                    widget:"="
                },
                controller: function($scope){
                    var widget=$scope.widget;
                    $scope.chartstyle={
                        width: widget.width+'px',
                        height: widget.height+'px'
                    };

                },
                link: function(scope, element, attrs, ctr){
                    var widget=scope.widget;
                    var chart=null;
                    require(["charts/"+widget.type],
                    function(VizChart){                        
                        chart= VizChart[widget.type].create();
                        chart.config({xAxis:widget.x_title, yAxis: widget.y_title});
                        chart.setData(widget.data, widget.selected_series, widget.selected_categories[0], widget.category_need_sorted);
                        chart.render(element.find("svg")[0]);
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
                                    chart.setData(widget.data, 
                                                    widget.selected_series, 
                                                    widget.selected_categories[0], 
                                                    widget.category_need_sorted);
                                    chart.render(element.find("svg")[0]);
                                }
                                else{

                                };
                        });
                    scope.$digest();
                    });
                    
                },
                template: "<div ><svg ng-style='chartstyle'></svg></div>"
            };
        })
        .directive('vizChartConfig',function(){//TODO: test
            return {
                restrict: "EA",
                scope: {
                    widget:"="
                },
                controller: function($scope){
                  $scope.getTemplate=function(){
                        return 'widget/module/template/charts/viz'+$scope.widget.type+'_config_tpl.html';
                  }; 
                  $scope.isInList=function(item,list){
                      return list.indexOf(item)>=0;
                  };

                  $scope.addOrRemoveToList=function(item,list,min, max){//max is the maximum number of item possible to add to the list
                      var pos=list.indexOf(item);
                      if (pos>=0){//remove if contains
                          if (min&&(list.length<=min)) return null;//stop if smaller than min
                          list.splice(pos,1);
                      }
                      else{//add if not in
                          list.push(item);
                          if (max&&(list.length>max)) list.shift();//remove first one if more than max
                      }
                  };
                },
                templateUrl: 'widget/module/template/vizChart_config_tpl.html'
//                template: "<ng-include src='getTemplate()'></ng-include>"
            };
        });
});
