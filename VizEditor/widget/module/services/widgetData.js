define(["angular","angular-resource"],function(angular){
    angular.module("DataManager",["ngResource"])
            .constant("BOOKDATA_CONS","book")
            .constant("SHEETDATA_CONS","sheet")
            .constant("WIDGETDATA_CONS","widget")
            .constant("SHEETDATADATA_CONS","sheet_data")
            .constant("format","json")
            .factory("getJsonData",["$http","$q",function($http,$q){
                function filterArray(array, conditionFunc){
                    var result=[];
                    for (var i=0, length=array.length;i<length;i++){
                        var item =array[i];
                        if (conditionFunc(item)){
                            result.push(item);
                        }
                    }
                    return result;
                }
                return function(dataName, dataFormat, conditionFunc){
                    var result=$q.defer();
                    var findFunc=conditionFunc;
                    $http({method: "GET", url: "widget/data/"+dataName+"."+dataFormat})
                        .success(function(data, status, headers, config){
                            var matchItems;
                            if (angular.isArray(data)){
                                matchItems=filterArray(data,findFunc);
                            }
                            else {
                               matchItems=[data];
                            }
                            result.resolve(matchItems);

                        })
                        .error(function(){
                            alert("Error when connecting to db");
                        });
                    return result.promise;
                };
            }])
            .factory("bookData",["BOOKDATA_CONS", "format", "getJsonData",
                function(bookData, dataFormat, getJsonData){
                    return {
                        getBookById: function(bookId){
                                        return getJsonData( 
                                                    bookData, 
                                                    dataFormat, 
                                                    function(datum){
                                                        return datum.id===bookId;
                                                    });
                                     }
                       
                    };
            }])
            .factory("widgetData",["WIDGETDATA_CONS","getJsonData","format",
                function(widgetData,getJsonData,format){
                    return {
                        getWidgetById: function(widgetId){
                             return getJsonData(
                                    widgetData,
                                    format,
                                    function(datum){
                                        return widgetId===datum.id;
                                    });
                        },
                        getWidgets: function(widgetIds){
                            return getJsonData(
                                    widgetData,
                                    format,
                                    function(datum){
                                        return widgetIds.indexOf(datum.id)>=0;
                                    });
                        }
                    };
                    
            }])
            .factory("sheetData",["SHEETDATA_CONS","SHEETDATADATA_CONS","format","getJsonData",
                function(sheetData,sheetDataData, dataFormat, getJsonData){
                    return {
                        getSheetById: function(sheetId){
                           return getJsonData(
                                   sheetData,
                                    dataFormat,
                                    function(datum){
                                        return datum.id===sheetId;
                                    });
                        },
                        getSheets: function(sheetIds){
                            return getJsonData(
                                    sheetData,
                                    dataFormat,
                                    function(datum){
                                        return sheetIds.indexOf(datum.id)>=0;
                                    });
                        },
                        getSheetData:function(sheetId){
                            return getJsonData(
                                    sheetDataData,
                                    dataFormat,
                                    function(datum){
                                        return datum.id=sheetId;
                                    });
                        }
                    };
                
            }]);

});