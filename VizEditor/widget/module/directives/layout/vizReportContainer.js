define(["angular",
        "lib/angular-bootstrap/ui-bootstrap-tpls.min",
        "directives/layout/vizReportLayout",
        "directives/layout/vizToolBox"
        ],
    function(angular){
    angular.module("vizDirectives.layout.vizReportContainer",[
                                                              "ui.bootstrap",
                                                              "vizDirectives.layout.vizReportLayout",
                                                              "vizDirectives.layout.vizToolBox"
                                                            ])
            .directive('vizReportContainer', function () {
                       return {
                               restrict: "EA",
                               scope:{
                                   book:'='
                               },
                               controller: function($scope){
                                   $scope.name='vizReportContainer';
                                   $scope.bookId=-1;
                               },
                               link: function(scope, elm, attrs, ctr){
                                   scope.bookId=attrs["bookId"];
                               },
                               templateUrl: "widget/module/template/layout/vizReportContainer_tpl.html"
                       };
                    });
});