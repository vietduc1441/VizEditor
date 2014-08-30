define(["charts/base","nvd3","d3"],
    function(viz, nv, d3){
    'use strict';
    function createNew(){
        var lineChart= nv.models.lineChart();
        lineChart.setData=function(data){
          this.data=sinAndCos();  
        },
        lineChart.render=function(parentNode){
            d3.select(parentNode)    //Select the <svg> element you want to render the chart in.   
                .datum(this.data)         //Populate the <svg> element with chart data...
                .call(this);          //Finally, render the chart!
            var self=this;
            nv.utils.windowResize(function() { self.update();});
        };
        lineChart.config=function(){
            this.margin({left: 50})  //Adjust this margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                .transitionDuration(350)  //how fast do you want the lines to transition?
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true);        //Show the x-axis
            this.xAxis     //Chart x-axis settings
                .axisLabel('Time (ms)')
                .tickFormat(d3.format(',r'));
            this.yAxis     //Chart y-axis settings
                .axisLabel('Voltage (v)')
                .tickFormat(d3.format('.02f'));

        };
        return lineChart;
    };
    viz.LineChart={
        create:createNew
    };
    return viz;    
});

function sinAndCos() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
    cos.push({x: i, y: .5 * Math.cos(i/10)});
  }

  //Line chart data should be sent as an array of series objects.
  return [
    {
      values: sin,      //values - represents the array of {x,y} data points
      key: 'Sine Wave', //key  - the name of the series.
      color: '#ff7f0e'  //color - optional: choose your own line color.
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c'
    },
    {
      values: sin2,
      key: 'Another sine wave',
      color: '#7777ff',
      area: true      //area - set to true if you want this line to turn into a filled area chart.
    }
  ];
}