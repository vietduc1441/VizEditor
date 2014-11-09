"use strict";
define(["angular",
    "utils/utils.module",
    "text"
    ],
    function(angular){
        angular.module('vizDirectives.widget.config', [
                                        'utils'
                                        ])
        .directive('vizChartConfig',function($compile){//TODO: test
            ////////////////////////////////////////////////////////////////////
            function loadTemplateToElement(scope, compile, type, elm){
            require(['text!template/charts/viz'+type+'_config_tpl.html'],
                function(htmlText){
                    var newElm=compile(htmlText)(scope)[0];
                    elm.append(newElm);
                });
            }
            ///////////////////////////////////////////////////////////////////
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
                link: function(scope, elm, attrs, ctrl){
                  scope.$watch("widget.type",function(newVal, oldVal, scope){
                      if (!newVal) return;
                      loadTemplateToElement(scope, $compile, scope.widget.type, elm);
                  });
                   //TODO: div to show loading...
                   //remove when data is loaded
                }
//                template: "<ng-include src='getTemplate()'></ng-include>"
            };
        });                               
    });