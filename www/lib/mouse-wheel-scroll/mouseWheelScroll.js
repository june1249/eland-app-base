angular.module('mouseWheelScroll', [])
.directive('mouseWheelScroll', function($timeout) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {
      var onMouseWheel, scrollCtrl;
      scrollCtrl = $element.controller('$ionicScroll');
      console.log(scrollCtrl);
      if (!scrollCtrl) {
        return console.error('mouseWheelScroll must be attached to a $ionicScroll controller.');
      }
      onMouseWheel = function(e) {
        return scrollCtrl.scrollBy(0, -e.wheelDeltaY, false);
      };
      return scrollCtrl.element.addEventListener('wheel', onMouseWheel);
    }
  };
});
