angular.module('app.controllers')
  .controller('AccountCtrl', function ($scope) {
    var vm = $scope.vm = {};
    vm.isHideTabs = false;
    $scope.settings = {
      enableFriends: true
    };
  });
