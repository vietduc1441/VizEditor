"use strict";
define(["angular",
    "utils",
    "vizProviders",
    "directives/layout/layout"
    ]
    ,
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
                        chart.config();
                        chart.setData();
                        chart.render(element.find("svg")[0]);

                        scope.$watch('widget.width+widget.height',function(){
//                            chart.resize(widget.width,widget.height);
    //                        scope.chartstyle={
    //                            width: widget.width+'px',
    //                            height: widget.height+'px'
    //                            };
                            });
                        scope.$watchCollection(
                            changeMonitor.getWatchColObj,//any change in config
                            function(){
                                if (!widget.data) {//no Data
    //                                chart.visualizeExampleData();
                                }else if(chart){
    //                                chart.setCategory(widget.selected_categories[0]);
    //                                chart.sortCategory(widget.category_need_sorted);
    //                                chart.setSeries(widget.selected_series);
    //                                chart.setData(widget.data);
    //                                chart.refresh();
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
                        return 'widget/module/template/viz'+$scope.widget.type+'_config_tpl.html';
                  }  
                  $scope.isInList=function(item,list){
                      return list.indexOf(item)>=0;
                  }

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
                  }
                },
                //templateUrl: 'widget/module/template/vizChart_config_tpl.html'
                template: "<ng-include src='getTemplate()'></ng-include>"
            };
        })

        .directive('resizer',['$document',function($document){
            return {
                restrict: 'A',
                link: function(scope, element, attrs, ctr){
                    var startX, startY, initialMouseX, initialMouseY;
                    var resizerElm=angular.element('<div class="resizer arrow-bottom-right"></div>');
                    element.append(resizerElm);
                    resizerElm.bind('mousedown', function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        startX = resizerElm.prop('offsetLeft');
                        startY = resizerElm.prop('offsetTop');
                        initialMouseX = event.clientX;
                        initialMouseY = event.clientY;
                        $document.bind('mousemove', mousemove);
                        $document.bind('mouseup', mouseup);
                    }); 
                    function mousemove(event) {
                        var dx = event.clientX - initialMouseX;
                        var dy = event.clientY - initialMouseY;
                        resizerElm.css({
                          top: (startY+dy) + 'px',
                          left: (startX+ dx) + 'px'
                        });
                        scope.$apply(function(){scope.resizing(dx,dy);});
                    } 
                    function mouseup() {
                        var dx = event.clientX - initialMouseX;
                        var dy = event.clientY - initialMouseY;
                        scope.$apply(function(){scope.setNewSize(dx,dy);});
                        $document.unbind('mousemove', mousemove);
                        $document.unbind('mouseup', mouseup);
                    }
                }
            }
        }])
        .directive('draggable', ['$document' , function($document) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var startX, startY, initialMouseX, initialMouseY;
        element.bind('mousedown', function(event) {
            // Prevent default dragging of selected content
            event.preventDefault();
            event.stopPropagation();
            startX = element.prop('offsetLeft');
            startY = element.prop('offsetTop');
            initialMouseX = event.clientX;
            initialMouseY = event.clientY;
            $document.bind('mousemove', mousemove);
            $document.bind('mouseup', mouseup);
        }); 
        function mousemove(event) {
            var dx = event.clientX - initialMouseX;
            var dy = event.clientY - initialMouseY;
            element.css({
              top: (startY+dy) + 'px',
              left: (startX+ dx) + 'px'
            });
        } 
        function mouseup() {
          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
        }
      }
    };
  }]);
})
