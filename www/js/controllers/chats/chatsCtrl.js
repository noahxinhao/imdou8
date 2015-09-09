angular.module('app.controllers')
  .controller('ChatCtrl', function ($scope, $ionicHistory,$location, $ionicModal,$rootScope, Chats) {
    var vm = $scope.vm = {};
    vm.tabsUrl = "/templates/tabs.html";
    vm.go=function(path){
      //$rootScope.imFadeOutLeft = "fadeOutLeft";
      $location.path(path);
    };

    $scope.$on('$ionicView.enter', function () {
      console.log('leaving chats view');
      // Make sure that the interval is destroyed
      $ionicHistory.clearHistory();
      $ionicHistory.clearCache();
    });

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };


    ///////////////////modal//////////////
    $ionicModal.fromTemplateUrl('../templates/notemodal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    $scope.$on('modal.hidden', function () {
    });
    $scope.$on('modal.removed', function () {
    });
  });
