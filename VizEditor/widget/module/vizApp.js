define(["angular",
        "vizDirectives",
        "services/ChartData",
        "services/generator",
        "services/widgetData"],
    function(angular){
    "use strict"
    var vizApp= angular.module("vizApp",["vizDirectives","DataManager"]);
    vizApp.controller("vizCtrl",["$scope","bookData","sheetData","widgetData","$q",
        function($scope, bookData,sheetData,widgetData,$q){
            var bookId=1;
            this.width="800px";
            this.height="600px";
            
            bookData.getBookById(bookId).then(function(book){
                $scope.book=book[0];
                sheetData.getSheets($scope.book.sheetids).then(function(sheets){
                    $scope.book.sheets=sheets;
                    sheets.forEach(function(sheet){
                        var q1=$q.defer();
                        var q2=$q.defer();
                        sheetData.getSheetData(sheet.id).then(function(sheetData){
                            sheet.data=sheetData[0].data;
                            q1.resolve({sheetData:sheetData});
                        });
                        widgetData.getWidgets(sheet.widgetids).then(function(widgets){
                            sheet.widgets=widgets;
                            q2.resolve({widgets:widgets});
                        });
                        $q.all([q1.promise,q2.promise]).then(function(resutls){
                            sheet.widgets.forEach(function(widget){
                                widget.data=sheet.data;
                            });
                        });
                    });
                });
            }); 
    }]);
    angular.module("Generator")
            .config(["idGeneratorProvider",function(idGenerator){
                idGenerator.setStartAt(1000);
            }]);
    angular.module("DataExtractor")
            .config(["MendixDataProvider",function(mendixDataProvider){
            //fake mx func
            function checkIsNumber(attr){
                return angular.isNumber(this[attr]);
            }
            function checkIsString(attr){
                return angular.isString(this[attr]);
            }
            //TODO: set isDate, Currency, .. here
            mendixDataProvider.setIsNumber(checkIsNumber);
            mendixDataProvider.setIsString(checkIsString);
    }]);
    return vizApp;
});
