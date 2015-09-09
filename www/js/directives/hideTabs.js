angular.module('app.directives').directive('hideTabs', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
      var doc = document.getElementById("imTabs").firstElementChild;
      scope.$watch(attributes.hideTabs, function(value){
        console.log("hideTabs:"+value);
        $rootScope.hideTabs = "tabs-item-hide";
      });

      scope.$on('$ionicView.leave', function() {
        if(doc.getAttribute("class").indexOf("animated fadeInUp")<0){
          doc.setAttribute("class",doc.getAttribute("class")+" animated fadeInUp");
        }
        $rootScope.hideTabs = false;
      });
    }
  };
});
