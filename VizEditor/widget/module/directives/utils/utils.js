define(["angular",
        "directives/utils/resizer",
        "directives/utils/draggable"
        ],
    function(angular){
        angular.module('utils',["utils.resizer","utils.draggable"]);
    }
);
