(function () {
  'use strict';
  angular.module('app.controllers')
    .controller('DotCtrl', function ($scope, $ionicHistory) {
      var vm = $scope.vm = {};
      vm.backToHome = function () {
        $ionicHistory.goBack();
      };
      vm.selected = 'house-fund';
      vm.select = function (p) {
        vm.selected = p;
      }
    })
})();
