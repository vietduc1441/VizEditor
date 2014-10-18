"use strict";
define(["angular",
    "directives/utils/utils"
    ],
    function(angular){
        angular.module('vizDirectives.chart.config', [
                                        'utils'
                                        ])
        .directive('vizChartConfig',function(){//TODO: test
            return {
                restrict: "EA",
                scope: {
                    widget:"="
                },
                controller: function($scope){
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
                templateUrl: 'widget/module/directives/chart/vizChart_config_tpl.html'
            };
        });                               
    });