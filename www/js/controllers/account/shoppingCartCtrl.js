angular.module('app.controllers')
  .controller('shoppingCartCtrl', function ($scope,$ionicHistory) {
    var vm = $scope.vm = {};
    vm.backToAccount = function () {
      $ionicHistory.goBack();
    };
    $scope.settings = {
      enableFriends: true
    };
  });
