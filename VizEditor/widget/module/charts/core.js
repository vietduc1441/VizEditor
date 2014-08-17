'use strict';
define([],function(){
    var VizChartFunc= function(){
        this.author="d.bui";
    };
    VizChartFunc.prototype.extend=function(Chart){
        Chart.prototype=Object.create(this._BaseChart);
        Chart.prototype.constructor=Chart;
        return Chart;
    };
    return new VizChartFunc;
});