define(["angular"],function(angular){
    angular.module("utils.draggable",[])
        .directive('draggable', ['$document' , function($document) {
            return {
              restrict: 'A',
              link: function(scope, element, attr) {
                var startX, startY, initialMouseX, initialMouseY;
                element.bind('mousedown', function(event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    event.stopPropagation();
                    startX = element.prop('offsetLeft');
                    startY = element.prop('offsetTop');
                    initialMouseX = event.clientX;
                    initialMouseY = event.clientY;
                    $document.bind('mousemove', mousemove);
                    $document.bind('mouseup', mouseup);
                }); 
                function mousemove(event) {
                    var dx = event.clientX - initialMouseX;
                    var dy = event.clientY - initialMouseY;
                    element.css({
                      top: (startY+dy) + 'px',
                      left: (startX+ dx) + 'px'
                    });
                } 
                function mouseup() {
                  $document.unbind('mousemove', mousemove);
                  $document.unbind('mouseup', mouseup);
                }
              }
            };
        }]);
});