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
                                   book:'=',
                                   sheets:'=sheets'
                               },
                               controller: function($scope){
                                   $scope.name='vizReportContainer';
                               },
                               templateUrl: "widget/module/template/layout/vizReportContainer_tpl.html"
                       };
                    });
});