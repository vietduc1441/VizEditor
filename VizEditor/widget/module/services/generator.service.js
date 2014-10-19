define(['angular'],function(angular){
    angular.module("Generator",[])
            .provider("idGenerator",function(){
                var currentId=0;
                this.setStartAt=function(StartAt){
                    currentId=StartAt;
                };
                this.$get=function(){
                    return function(){
                        currentId++;
                        return currentId;
                    };
                };    
            });
});