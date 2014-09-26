define(["angular"],function(angular){
    angular.module("DataExtractor",[])
            .provider("MendixData",function(){
                var checkIsBoolean,
                    checkIsCurrency,
                    checkIsDate,
                    checkIsEnum,
                    checkIsNumber,
                    checkIsString,
                    checkIsPassword,
                    checkIsObjectReference,
                    checkIsObjectReferenceSet;
                    
                //configurable
                this.setIsBoolean=function(MxIsBoolean){
                    checkIsBoolean=MxIsBoolean;
                };
                this.setIsDate=function(MxIsDate){
                    checkIsDate=MxIsDate;
                };
                this.setIsCurrency=function(MxIsCurrency){
                    checkIsCurrency=MxIsCurrency;
                };
                this.setIsEnum=function(MxIsEnum){
                    checkIsEnum=MxIsEnum;
                };
                this.setIsNumber=function(MxIsNumber){
                    checkIsNumber=MxIsNumber;
                };
                this.setIsString=function(MxIsString){
                    checkIsString=MxIsString;
                };
                this.setIsPassword=function(MxIsPassword){
                    checkIsPassword=MxIsPassword;
                };
                this.setIsObjectReference=function(MxIsObjectReference){
                    checkIsObjectReference=MxIsObjectReference;
                };
                this.setIsObjectReferenceSet=function(MxIsObjectReferenceSet){
                    checkIsObjectReferenceSet=MxIsObjectReferenceSet;
                };
                this.$get=function(){
                    return {
                        isBoolean: checkIsBoolean,//only function name
                        isCurrency: checkIsCurrency,//only function name
                        isDate: checkIsDate,
                        isEnum: checkIsEnum,
                        isNumber: checkIsNumber,
                        isPassword: checkIsPassword,
                        isObjectReference: checkIsObjectReference,
                        isObjectReferenceSet: checkIsObjectReferenceSet
                    };
                };
            })
            .factory("GetLineChartData",["MendixData",function(MendixDataProvider){
                return function(rawData){
                    var result={
                                id:1,
                                width:400,
                                height:300,
                                x_title:"Undefined", 
                                y_title: "Undefined",
                                series:[],
                                serie_names:[],
                                selected_series:[],
                                categories:[],
                                category_names:[],
                                selected_categories:[],
                                category_need_sorted:false,
                                link:"Undefined"
                                };
                    var item =rawData[0];
                    for (var attr in item){
                        if (MendixDataProvider.isNumber.call(item,attr)){
                           result.series.push(attr);
                           result.categories.push(attr);
                        }
                    }
                    result.data=rawData;
                    result.selected_series.push(result.series[0]);
                    result.selected_categories.push(result.categories[0]);
                    return result;
                };
            }]);
});

/*
 * in:
 * [{order: 3, id: 13, product0: 1, product1:2, product2:1},
                            {order: 0, id: 10, product0: 4, product1:3, product2:7},
                            {order: 1, id: 6, product0: 15, product1:1, product2:4},
                            {order: 2, id: 11, product0: 9, product1:4, product2:5},
                            {order: 3, id: 12, product0: 2, product1:6, product2:2}]                               
 * 
 * 
 * {                       x_title:"month", y_title:"amount",//title
                           series:["product0","product1","product2"],//series
                           serie_names:["product0","product1","product2"],//alias name of serie
                           selected_series:["product0","product1"], //selected series
                           categories:["order","id"], //cat
                           category_names:["order","id"],//cat alias name
                           selected_categories:["order"], //selected cat
                           category_need_sorted: false,
                           link:"www.shareme.com/widget/1"}
 */