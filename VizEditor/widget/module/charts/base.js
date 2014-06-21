/*
 * function to create baseChart
 */
//http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
//http://addyosmani.com/writing-modular-js/
(function baseChart(viz){
    'use strict';
    viz._BaseChart={
        name: 'baseChart',
        chartName: '',
        iconUrl: '',
        cssClass: '',
        label: '',
        chartCellCss: 'chartCell',
        backgroundCss: 'background',
        chartWidth: 0,
        chartHeight: 0,
        margin:{top: 20, right: 50, bottom: 20, left: 20},
        visualizationContainer: null,//container of svg part 
                                    //background and innercontainer 
                                    //create innercontainer to make margin easier
        chartContainer: null,//container of the visual and label, ...
        colors: null,
        data: null,
        setData: function(rawData){
            this.data=this.processRawData(rawData);
        },      
        setWidth: function(width){
            this.chartWidth=width;
        },
        setHeight: function(height){
            this.chartHeight=height;
        },
        setSize: function(width,height){
            this.chartWidth=width;
            this.chartHeight=height;
        },
        resize: function(newWidth, newHeight){
            this.setSize(newWidth, newHeight);
            this.refresh();
        },
        createChartContainer: function(parentNode, position){
            var chartContainer=d3.select(parentNode)
                    .append("div")
                    .attr('class','chartContainer')
                    .style('left',position.x+'px')
                    .style('top',position.y+'px');
            this.chartContainer=chartContainer;
            this.setChartContainerSize();
            var visualizationContainer=chartContainer
                    .append("div").attr('id','visualizationContainer')
                    .append("svg")
                    .attr('class', 'chartCell')
                    .style("width",this.chartWidth)
                    .style("height",this.chartHeight);
            visualizationContainer.append("rect")
                .attr('class','background')
                .attr('id', 'background')
                .attr('height',this.chartHeight)
                .attr('width', this.chartWidth)
                .attr('rx', 10)
                .attr('ry', 10);
            this.visualizationContainer=visualizationContainer;
            
            return chartContainer;
        },
        setChartContainerSize: function(){
            this.chartContainer.style('width',this.chartWidth+'px')
                    .style('height',this.chartHeight+'px');
            
        },
        refresh: function(){
            this.cleanInnerContainer();
            this.setChartContainerSize();
            this.render();
        },
        cleanInnerContainer: function(){
            this.visualizationContainer.select('.innercontainer').remove();
        },
        render: function(){
        },
        setPostion: function(x,y){
            this.chartContainer
                .style('left',x+'px')
                .style('top',y+'px');
        },
        processRawData: function(){
        },
        closeSvgContainer: function(){
            this.chartContainer.remove();
            //TODO: remove data...
        },
        toString: function(){
          return this.name;  
        }
    };
    return viz;
})(VizChart);