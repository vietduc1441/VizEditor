define(["charts/base","nvd3","d3"],
    function(viz, nv, d3){
    'use strict';
    function createNew(){
        var chart = nv.models.pieChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .showLabels(true);
        chart.setData=function(data){
          this.data=exampleData();  
        },
        chart.config=function(){
            
        };    
        chart.render=function(parentNode){
            d3.select(parentNode)    //Select the <svg> element you want to render the chart in.   
                .datum(this.data)         //Populate the <svg> element with chart data...
                .call(this);          //Finally, render the chart!
            var self=this;
            nv.utils.windowResize(function() { self.update();});
        };
        return chart;
    };
    viz.PieChart={
        create:createNew
    };
    return viz;    
});
function exampleData() {
  return  [
      { 
        "label": "One",
        "value" : 29.765957771107
      } , 
      { 
        "label": "Two",
        "value" : 0
      } , 
      { 
        "label": "Three",
        "value" : 32.807804682612
      } , 
      { 
        "label": "Four",
        "value" : 196.45946739256
      } , 
      { 
        "label": "Five",
        "value" : 0.19434030906893
      } , 
      { 
        "label": "Six",
        "value" : 98.079782601442
      } , 
      { 
        "label": "Seven",
        "value" : 13.925743130903
      } , 
      { 
        "label": "Eight",
        "value" : 5.1387322875705
      }
    ];
}