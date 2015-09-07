angular.module('app.directives').directive('hideTabs', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
      scope.$watch(attributes.hideTabs, function(value){
        console.log("hideTabs:"+value);
        $rootScope.hideTabs = "tabs-item-hide";
      });

      scope.$on('$ionicView.leave', function() {
        $rootScope.hideTabs = false;
      });
    }
  };
});
