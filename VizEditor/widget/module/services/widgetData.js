define(["angular","angular-resource"],function(angular){
    angular.module("DataManager",["ngResource"])
            .constant("bookData","data")
            .constant("bookFormat","json")
            .factory("bookData",["sheetData", "$http", "bookData", "bookFormat", "$q", function(sheetData, $http, dataName, dataFormat, $q){
                function getBookData(){
                    var result=$q.defer();
                    $http({method: "GET", url: "widget/data/"+dataName+"."+dataFormat})
                        .success(function(data, status, headers, config){
                            result.resolve(data);
                        })
                        .error(function(){
                            alert("Error when connecting to db");
                        });
                    return result.promise;
                }
                return {
                    getBookData:getBookData
                };
            }])
            .factory("sheetData",["widgetData","$resource",function(widgetData, $resource){
                
            }])
            .factory("widgetData",["$resource",function($resource){
                
            }]);
});