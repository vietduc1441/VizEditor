"use strict";
define(["angular",
    "utils/utils.module",
    "vizProviders",
    "layout/layout.module",
    "widget/widget.directive",
    "services/widgetData"
    
    ],
    function(angular){
        angular.module('vizDirectives', ['utils','vizService',
                                        'vizDirectives.layout',
                                        'vizDirectives.widget'
                                        ]);
});
