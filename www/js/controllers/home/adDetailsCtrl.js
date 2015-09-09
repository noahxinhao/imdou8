angular.module('app.controllers')
  .controller('adDetailsCtrl', function ($scope, $ionicHistory, $stateParams, $ionicModal) {
    var vm = $scope.vm = {};
    vm.backToHome = function () {
      $ionicHistory.goBack();
    }

    vm.slideElement = [
      {
        "img": "http://img.117go.com/timg/ws/750x420/150906/rd4Djm3RA8mYoUuD2q.jpg"
      },
      {
        "img": "http://img.117go.com/timg/ws/750x420/150906/rd4DjmEgjKDBp0flgl.jpg"
      },
      {
        "img": "http://img.117go.com/timg/ws/750x420/150906/rd4DjmFxrweKdXuCvA.jpg"
      }
    ];
  });
