describe("Test VizApp",function(){
    var scope;
    beforeEach(module("vizApp"))
    beforeEach(inject(function($controller,$rootScope){
        scope=$rootScope.$new();
        $controller("vizCtrl",{$scope:scope});
    }));
    it("Scope should have widgets as an array", function(){
        expect(scope.widgets.length).not.toBeNull();
    });
    it("A sheet could get a list of widget by 'widgets' attribute", function(){
       expect(scope.sheets[0].widgets.length).not.toBeNull();
    })
});