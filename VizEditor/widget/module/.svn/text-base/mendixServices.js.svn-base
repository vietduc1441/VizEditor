angular.module("mendixService",[])
.factory("mendixDataService", function($q, $rootScope){
    return {
        callMicroflow: function callMicroflow(microflow, guid){
            var deferred = $q.defer();          
            mx.data.get({
                    microflow: microflow,
                    guid: guid,
                    noCache: true,
                    callback: function(objects){
                        deferred.resolve(objects);
                        $rootScope.$apply();
                    },
                    error: function(){
                        console.log('error when trigger microflow: '+microflow);
                    }
                });
            return deferred.promise;
        }
    };
})
.factory("mendixActionService", function(){
    var mxAction= function(microflow, guids){
            mx.data.action({//http://apidocs.mendix.com/4/client/data.html#action
                params: {
                    applyto     : "selection",
                    actionname  : microflow,
                    guids       : guids
                },
                callback    : function(obj) {
                },
                error   : function(error) {
                }
            });
    };
    return {
        openEditForm: function callMicroflow(microflow, guid){
            mxAction(microflow,[guid])
        }
    };
})