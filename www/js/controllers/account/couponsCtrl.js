angular.module('app.controllers')
  .controller('couponsCtrl', function ($scope,$ionicHistory) {
    var vm = $scope.vm = {};
    vm.backToAccount = function () {
      $ionicHistory.goBack();
    };
    $scope.settings = {
      enableFriends: true
    };
  });
