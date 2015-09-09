angular.module('app.controllers')
  .controller('walletCtrl', function ($scope,$ionicHistory) {
    var vm = $scope.vm = {};
    vm.backToAccount = function () {
      $ionicHistory.goBack();
    };
  });
