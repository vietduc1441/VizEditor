define(["charts/base","nvd3"],
    function(viz, nv){
    'use strict';
    
    var LineChart=viz.extend(
        function(){
        this.name='linechart';
        this.cssClass='LineChart';
        this.colors=d3.scale.category20();
        this.orientAxisX= 'bottom';
        this.orientAxisY= 'left';
        this.category= '';
        this.series= [];
        this.dataXType= '';
        this.filteredData=null;
        this.setDataTypeX= function(dataXType){
            this.dataXType=dataXType;
        };
        this.setCategory= function(category){
            this.category=category;
        };
        this.sortCategory=function(needSort){
            this.category_need_sorted=needSort;
        };
        this.validateXAttribute= function(category){
            if (category.isMeasure)
                return true;
        };
        this.validateYAttribute= function(series){
            if (series.isMeasure)
                return true;
        };
        this.setSeries= function(series){
            this.series=series;
        };
        this.setData= function(data){
            this.data=data;
        };
        this.visualizeExampleData= function(){
            this.setCategory('x');
            this.setSeries(['y0','y1']);
            this.data=
                        [
                            {x: 0, y0: 4, y1:7},
                            {x: 2, y0: 9, y1:4},
                            {x: 3, y0: 2, y1:3}                               
                        ];
            this.render();
            //TODO: watermark "Sample data, drop data here to visualize"
        };
        this.render= function(){
            var innerWidth=this.chartWidth-this.margin.left-this.margin.right,
                innerHeight=this.chartHeight-this.margin.top-this.margin.bottom,
                scaleX=d3.scale.linear().range([0,innerWidth]),//TODO: support date time on X
                scaleY=d3.scale.linear().range([innerHeight,0]),//check this
                xAxis=d3.svg.axis()
                        .scale(scaleX)
                        .orient(this.orientAxisX),
                yAxis = d3.svg.axis()
                            .scale(scaleY)
                            .orient(this.orientAxisY),
                line = d3.svg.line()
                        .x(function(d) { return scaleX(d.x);})
                        .y(function(d) { return scaleY(d.y);}),
                colors=this.colors,
                category=this.category,
                innerContainer;
//            if (this.filteredData===null){//TODO: Chech when need to re-process data
                this.filteredData=this.processRawData(this.data);
//            };
            if (!category||!this.series.length) return;
            colors.domain(this.series);             
            scaleX.domain(d3.extent(this.data, function(d){
                                        return d[category];
                                    }));

            scaleY.domain([d3.min(this.filteredData, function(d) { return d3.min(d.values,function(v){return v.y;}); }),
                           d3.max(this.filteredData, function(d) { return d3.max(d.values,function(v){return v.y;}); })]);
            innerContainer=this.visualizationContainer.append("g")
                            .attr('class','innercontainer')
                            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
            innerContainer.append('rect')
                            .attr('class','innerbackground')
                            .attr('x',0)
                            .attr('y',0)
                            .attr('width',innerWidth)
                            .attr('height',innerHeight);
            innerContainer.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," +innerHeight+ ")")
                .call(xAxis);
            innerContainer.append("g")
                .attr("class", "axis")
                .call(yAxis);

           innerContainer.selectAll("linegroup")
                .data(this.filteredData)
                .enter().append("g")
                    .attr("class", "linegroup")
                .append("path")
                    .attr("d", function(d) { return line(d.values);})
                    .style("stroke", function(d) {
                                return colors(d.name); 
                            });
        };
        this.processRawData= function(data){
            var filteredData=[], xAttr, series, processedData;       
            if (!this.category||!this.series.length) return data;
            xAttr=this.category;
            series=this.series;
//            sort data according to category
            if (this.category_need_sorted){
                processedData=data.sort(function comparetor(a,b){return a[xAttr]-b[xAttr];});
            }
            else{
                processedData=data;
            }
                                    
            processedData=d3.nest()
                    .key(function(d){return d[xAttr];})
                    .rollup(function(leaves) {
                                    var sumup={};
                                    for(var leaf in leaves[0]){
                                        if (series.indexOf(leaf)>=0)
                                            sumup[leaf]=d3.sum(leaves,function(d){return d[leaf];});
                                    }
                                    return sumup;
                                })
                    .entries(processedData);
            
            //create a map for each category
            filteredData=this.series.map(function(yAttr){
                return {
                            name: yAttr,//category's name
                            values: processedData.map(function(d){
                                return {x: d.key,//x value
                                        y: d.values[yAttr]};//y value
                            }, this)
                       };
            }, this);
            return filteredData;
        };
    });
    
    function createNew(){
        return new LineChart();
    };
    viz.LineChart={
        create:createNew
    };
    return viz;    
});