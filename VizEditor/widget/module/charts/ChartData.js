define(["angular"],function(angular){
    angular.module("DataExtractor",[])
            .factory("GetLineChartData",function(){
                return function(rawData){
                    return {test:"test"};
                };
    });
});