define(["angular",
        "lib/angular-bootstrap/ui-bootstrap-tpls.min",
        "directives/layout/vizToolBox"
        ],
    function(angular){
    angular.module("vizDirectives.layout.vizReportContainer",[
                                                              "ui.bootstrap",
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
                               templateUrl: "widget/module/template/vizReportContainer_tpl.html"
                       };
                    });
});