(function () {
    'use strict';
    /***************************************************************
     * Helper functions for older browsers which do not 
     * have create function on Object
     ***************************************************************/
    if (!Object.hasOwnProperty('create')) {
        Object.create = function (parentObj) {
            function tmpObj() {}
            tmpObj.prototype = parentObj;
            return new tmpObj();
        };
    }
    if (!Object.hasOwnProperty('defineProperties')) {
        Object.defineProperties = function (obj, props) {
            for (var prop in props) {
                Object.defineProperty(obj, prop, props[prop]);
            }
        };
    }
    /*************************************************************/
})();