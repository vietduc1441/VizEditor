"use strict";
define(["angular",
    "directives/utils/utils",
    "vizProviders",
    "directives/layout/layout",
    "directives/chart/chart",
    "services/widgetData"
    
    ],
    function(angular){
        angular.module('vizDirectives', ['utils','vizService',
                                        'vizDirectives.layout',
                                        'vizDirectives.chart'
                                        ]);
});
