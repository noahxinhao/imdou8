angular.module('app.controllers')
  .controller('friendsCtrl', function ($scope,$ionicHistory) {
    var vm = $scope.vm = {};
    vm.backToAccount = function () {
      $ionicHistory.goBack();
    };
    $scope.settings = {
      enableFriends: true
    };
  });
