define(["angular"],function(angular){
    angular.module("utils.resizer",[])
            .directive('resizer',['$document',function($document){
            return {
                restrict: 'A',
                link: function(scope, element, attrs, ctr){
                    var startX, startY, initialMouseX, initialMouseY;
                    var resizerElm=angular.element('<div class="resizer arrow-bottom-right"></div>');
                    element.append(resizerElm);
                    resizerElm.bind('mousedown', function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        startX = resizerElm.prop('offsetLeft');
                        startY = resizerElm.prop('offsetTop');
                        initialMouseX = event.clientX;
                        initialMouseY = event.clientY;
                        $document.bind('mousemove', mousemove);
                        $document.bind('mouseup', mouseup);
                    }); 
                    function mousemove(event) {
                        var dx = event.clientX - initialMouseX;
                        var dy = event.clientY - initialMouseY;
                        resizerElm.css({
                          top: (startY+dy) + 'px',
                          left: (startX+ dx) + 'px'
                        });
                        scope.$apply(function(){scope.resizing(dx,dy);});
                    } 
                    function mouseup() {
                        var dx = event.clientX - initialMouseX;
                        var dy = event.clientY - initialMouseY;
                        scope.$apply(function(){scope.setNewSize(dx,dy);});
                        $document.unbind('mousemove', mousemove);
                        $document.unbind('mouseup', mouseup);
                    }
                }
            };
        }]);
});