define(["angular",
        "vizDirectives",
        "services/ChartData.service",
        "services/generator.service"
        ],
    function(angular){
    "use strict"
    var vizApp= angular.module("vizApp",["vizDirectives"]);
    vizApp.controller("vizCtrl",["$scope",
        function($scope){
            this.width="800px";
            this.height="600px";
    }]);
    angular.module("Generator")
            .config(["idGeneratorProvider",function(idGenerator){
                idGenerator.setStartAt(1000);
            }]);
    angular.module("DataExtractor")
            .config(["MendixDataProvider",function(mendixDataProvider){
            //fake mx func
            function checkIsNumber(attr){
                return angular.isNumber(this[attr]);
            }
            function checkIsString(attr){
                return angular.isString(this[attr]);
            }
            //TODO: set isDate, Currency, .. here
            mendixDataProvider.setIsNumber(checkIsNumber);
            mendixDataProvider.setIsString(checkIsString);
    }]);
    return vizApp;
});
