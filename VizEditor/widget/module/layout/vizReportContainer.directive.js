define(["angular",
        "lib/angular-bootstrap/ui-bootstrap-tpls.min",
        "layout/vizReportLayout.directive",
        "layout/vizToolBox.directive",
        "services/widgetData"
        ],
    function(angular){
        angular.module("vizDirectives.layout.vizReportContainer",[
                                                            "DataManager",
                                                            "ui.bootstrap",
                                                            "vizDirectives.layout.vizReportLayout",
                                                            "vizDirectives.layout.vizToolBox"
                                                            ])
            .directive('vizReportContainer',vizReportContainerDef);
    
        function vizReportContainerDef() {
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
                    templateUrl: "widget/module/layout/vizReportContainer_tpl.html"
            };
             //////////////////////////////////////////////////////////
            /**
             * Note: actually, at this step, everything is retrieved.
             * it would be divided in 2 step
             * 1. when has bookId, get  book and sheetIds 
             * 2. For each sheetId, get sheet and data and widgetIds
             * 3. Send data and widgetid to create a widget
             * @param {type} newVal
             * @param {type} oldVal
             * @param {type} scope
             * @param {type} bookData
             * @param {type} sheetData
             * @param {type} widgetData
             * @param {type} $q
             * @returns {undefined}
             */
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
                            //TODO: only get widgetIds for sheet
                            widgetData.getWidgets(sheet.widgetids).then(function(widgets){
                                sheet.widgets=widgets;
                                q2.resolve({widgets:widgets});
                            });
                            //TODO: dont need this, send sheet.data to widget
                            $q.all([q1.promise,q2.promise]).then(function(resutls){
                                sheet.widgets.forEach(function(widget){
                                    widget.data=sheet.data;
                                });
                            });
                        });
                    });
                });  
            };
            
            ///////////////////////////////////////////////////////////
        };
});