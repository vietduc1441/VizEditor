describe("Test vizReport",function(){
    var $compile;
    var $rootScope;
    var book={
        bookname: "My first book"       
        };
    var sheets=[
            {id:1, sheetname:"Sheet 1", content: "Sheet1 content", widgetids: []},
            {id:2, sheetname:"Sheet 2", content: "Sheet2 content", widgetids: []},
            {id:3, sheetname:"Sheet 3", content: "Sheet3 content", widgetids: []}
        ]
    beforeEach(module('vizDirectives'));
    beforeEach(inject(function(_$compile_,_$rootScope_){
        $compile=_$compile_;
        $rootScope=_$rootScope_;
        $rootScope.book=book;
        $rootScope.sheets=sheets;
        
    }));
    describe("-> Report Container", function(){
        var vizReport;
        beforeEach(function(){
            vizReport=$compile('<viz-report-container book="book" sheets="sheets"></viz-report-container>')($rootScope);
            $rootScope.$digest();
        });
        it("Default bookname should be 'My first book'",function(){
            expect(vizReport.html()).toContain("My first book");
        });
        it("We should have 3 tabs", function(){
            expect(vizReport.html().match(/<tab-heading/g).length).toBe(3);
        });
    });
    describe("-> Toolbox",function(){
        it("Default background text of Toolbox should contain 'Toolbox'",function(){
            var vizReport=$compile("<viz-toolbox></viz-toolbox>")($rootScope);
            $rootScope.$digest();
            expect(vizReport.html()).toContain("Toolbox");
        });
    })
});
describe("Test Linechart directives",function(){
    var $compile,
        $rootScope;
    beforeEach(module('vizDirectives'));
    beforeEach(inject(function(_$compile_,_$rootScope_){
        $compile=_$compile_;
        $rootScope=_$rootScope_;
    }));
    describe("-> lineChart",function(){
        var lineChart;
        beforeEach(function(){
            var widget={};
            widget.x=100;
            widget.y=100;
            widget.type="LineChart";
            $rootScope.widget=widget;
            lineChart=$compile('<ng-chart></ng-chart>')($rootScope);
            $rootScope.$digest();
        });
        it("A linechart directive is existed", function(){
           expect(lineChart.html()).not.toBe(''); 
        });
        it("A linechart should have 2 tabs",function(){
            expect(lineChart.html().match(/<tab/g).length).toBe(2);
        });
        it('A linechart should have tab "Config"',function(){
            expect(lineChart.html()).toContain('Config');
        });
        it('A linechart should have tab "Visualization"',function(){
            expect(lineChart.html()).toContain('Visualization') ;
        });
        
    });
});
describe("Test Visualization directive", function(){
   beforeEach(module("vizDirectives"));
   
   it("Visualization directive should exist",inject(function($compile,$rootScope){
       $rootScope.charttype="LineChart";
       var viz=$compile('<Visualization chart-type="linechart" data="[1,2]></Visualization>')($rootScope);
        $rootScope.$digest();
       expect(viz.html()).not.toBe("");
   }));
});
describe("Test vizchartconfig directive", function(){
   beforeEach(module("vizDirectives"));
   
   it("vizchartconfig directive should exist",inject(function($compile,$rootScope){
       var viz=$compile('<viz-chart-config></viz-chart-config>')($rootScope);
        $rootScope.$digest();
       expect(viz.html()).not.toBe("");
   }));
});
//http://lostechies.com/gabrielschenker/2013/12/10/angularjspart-3-inheritance/