define(["angular"],function(angular){
    angular.module("vizService",[])
        .factory("changeMonitor",function(){
            return {
                getWatchColObj: function(scope){
                    var widget=scope.widget;
                    if (!widget.data) return {};
                    if(widget.type==="LineChart"){
                        return { 
                           label: widget.label,
                           x_title:widget.x_title, 
                           y_title:widget.y_title,
                           series: widget.series.length, 
                           serie_names:widget.serie_names.length,
                           selected_series: widget.selected_series.length,
                           categories: widget.categories.length, 
                           category_names:widget.category_names.length,
                           selected_categories:widget.selected_categories[0],
                           data:widget.data&&widget.data.length
                        };
                    }
                    return{};
                }                
            };
        });
});
