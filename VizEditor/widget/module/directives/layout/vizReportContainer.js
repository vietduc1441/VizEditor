define(["angular",
        "lib/angular-bootstrap/ui-bootstrap-tpls.min",
        "directives/layout/vizReportLayout",
        "directives/layout/vizToolBox",
        "services/widgetData"
        ],
    function(angular){
        function getBookData(newVal, oldVal, scope, bookData, sheetData, widgetData, $q){
            if (newVal===-1) return;
            bookData.getBookById(scope.bookId).then(function(book){
                scope.book=book[0];
                sheetData.getSheets(scope.book.sheetids).then(function(sheets){
                    scope.book.sheets=sheets;
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
        };
        angular.module("vizDirectives.layout.vizReportContainer",[
                                                            "DataManager",
                                                            "ui.bootstrap",
                                                            "vizDirectives.layout.vizReportLayout",
                                                            "vizDirectives.layout.vizToolBox"
                                                            ])
            .directive('vizReportContainer', function () {
                       return {
                               restrict: "EA",
                               scope:{
                               },
                               controller: ["$scope","bookData","sheetData","widgetData","$q",function($scope, bookData,sheetData,widgetData,$q){
                                   $scope.name='vizReportContainer';
                                   $scope.book=[];
                                   $scope.bookId=-1;
                                   $scope.$watch("bookId",
                                                function(newVal,oldVal,scope){
                                                    getBookData(newVal, oldVal, scope, bookData, sheetData, widgetData, $q);
                                                });
                               }],
                               link: function(scope, elm, attrs, ctr){
                                   scope.bookId=parseInt(attrs["bookId"]);
                               },
                               templateUrl: "widget/module/template/layout/vizReportContainer_tpl.html"
                       };
                    });
});