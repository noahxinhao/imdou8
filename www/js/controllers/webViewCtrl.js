angular.module('app.controllers')

.controller('webViewCtrl', function($scope,$rootScope,$ionicHistory) {
    var vm = $scope.vm = {};
    $rootScope.tabsUrl = "/templates/tabs.html"
    vm.back = function(){
      $ionicHistory.goBack();
    }
  });
