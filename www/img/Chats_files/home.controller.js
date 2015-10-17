(function () {
  'use strict';
  angular.module('app.controllers')
    .controller('HomeCtrl', function ($scope, $rootScope, baiduMapService) {
      var vm = $scope.vm = {};

      baiduMapService.getUserCityLocation().then(function (result) {
        vm.userLocation = result;
      });

      vm.updateData = function () {
        $timeout(function () {
          $scope.$broadcast('scroll.refreshComplete');
          console.log("加载数据");
        }, 2000);
      };

      $scope.$on('$ionicView.enter', function () {
        $rootScope.hideTabs = "fadeInUp"
      });
      vm.slideElement = [
        {
          "img": "img/gjj01.jpg"
        },
        {
          "img": "img/gjj02.jpg"
        },
        {
          "img": "img/gjj03.jpg"
        },
        {
          "img": "img/gjj04.jpg"
        },
        {
          "img": "img/gjj02.jpg"
        }
      ];
    })
})();
