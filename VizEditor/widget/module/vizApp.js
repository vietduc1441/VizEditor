"use strict"
define(["angular","vizDirectives"],function(angular){
    var vizApp= angular.module("vizApp",["vizDirectives"]);
    vizApp.controller("vizCtrl",function($scope){
    this.width="800px";
    this.height="600px";
    $scope.book={
        bookname:"My first visualization",
        sheetids:[1,2,3],
        author: "DUC"
    };
    $scope.sheets=[
        {id:1, sheetname:"Sheet 1", content: "Sheet1 content", widgetids: [1], oql:{id: 1, amount: null, query: "oql query to get data" }},
//        {id:2, sheetname:"Sheet 2", content: "Sheet2 content", widgetids: [3, 5, 6], oql:{id: 2, amount: null, query: "oql query to get data" }},
       // {id:3, sheetname:"Sheet 3", content: "Sheet3 content", widgetids: [2, 8, 7], oql:{id: 3, amount: null, query: "oql query to get data" }}
    ];
    $scope.widgets=[{id:1, type: "LineChart", x: 300, y: 10, width: 700, height: 500, 
                           label: "A multiple linechart", //name of the widget
                           shapes:["21","22"], //shapes of the point (circle for now)
                           x_title:"month", y_title:"amount",//title
                           series:["product0","product1","product2"],//series
                           serie_names:["product0","product1","product2"],//alias name of serie
                           selected_series:["product0","product1"], //selected series
                           categories:["order","id"], //cat
                           category_names:["order","id"],//cat alias name
                           selected_categories:["order"], //selected cat
                           category_need_sorted: false,
                           link:"www.shareme.com/widget/1"},
                       
                    {id:2, type: "PieChart", x: 120, y: 250, width: 200, height: 200, label:["label"]},
                    {id:3, type: "BarChart", x: 10, y: 30, width: 200, height: 200},
                    {id:4, type: "MapInfo", x: 123, y: 20, width: 200, height: 200},
                    {id:5, type: "MultipleLineChart", x: 104, y: 220, width: 100, height: 200},
                    {id:6, type: "BubleChart", x: 130, y: 280, width: 200, height: 200},
                    {id:7, type: "ChordDiagram", x: 660, y: 830, width: 200, height: 200},
                    {id:8, type: "StackedBar", x: 10, y: 930, width: 200, height: 200}
                    ];
    // connect sheets and widgets
    $scope.sheets.forEach(function(sheet){
       sheet.widgets =  $scope.widgets.filter(function(widget){
                            return sheet.widgetids.indexOf(widget.id)>=0;
                        });
    });
    //fake retrieved data as result of query on each sheet
    $scope.sheets.forEach(function(sheet){
        sheet.data  =   [   {order: 3, id: 13, product0: 1, product1:2, product2:1},
                            {order: 0, id: 10, product0: 4, product1:3, product2:7},
                            {order: 1, id: 6, product0: 15, product1:1, product2:4},
                            {order: 2, id: 11, product0: 9, product1:4, product2:5},
                            {order: 3, id: 12, product0: 2, product1:6, product2:2}                               
                        ];
        //populate data to sheet
        sheet.widgets.forEach(function(widget){
            widget.data=sheet.data;
        });
    });
    
    });
    return vizApp;
});
