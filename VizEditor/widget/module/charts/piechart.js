define(["charts/base","nvd3","d3"],
    function(viz, nv, d3){
    'use strict';
    
    function setData(data){
      this.data=exampleData();  
    };
    function render(parentNode){
        d3.select(parentNode)    //Select the <svg> element you want to render the chart in.   
            .datum(this.data)         //Populate the <svg> element with chart data...
            .call(this);          //Finally, render the chart!
        var self=this;
        nv.utils.windowResize(function() { self.update();});
    };
    function resize(){
        this.update();
    };
    function config(configObj){
        configObj.label="label";
        configObj.value="value";
        this.margin({left: 50});  //Adjust this margins to give the x-axis some breathing room.
        this.x(function(d) { return d[configObj.label]; })
            .y(function(d) { return d[configObj.value]; })
            .showLabels(true);
    };
    function addFunctions(pieChart){
        pieChart.setData=setData;
        pieChart.render=render;
        pieChart.resize=resize;
        pieChart.config=config;
        return pieChart;
    }
    function createNew(){
        var pieChart=nv.models.pieChart()
            .x(function(d) { return d.label ;})
            .y(function(d) { return d.value ;})
            .showLabels(true);
        return addFunctions(pieChart);
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