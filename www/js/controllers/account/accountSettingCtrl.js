angular.module('app.controllers')
  .controller('accountSettingCtrl', function ($scope, $ionicHistory, $ionicActionSheet, $timeout, CameraService) {
    var vm = $scope.vm = {};
    vm.backToAccount = function () {
      $ionicHistory.goBack();
    };

    vm.imgUrl = "img/TB1km1AIXXXXXaAXVXXTIPs_XXX-1125-352.png";
    vm.getPhoto = function () {
      CameraService.getPicture().then(function (data) {
        vm.imgUrl = data
      }, function (err) {
        alert(err)
      });
    };

    vm.getPhotoFromAlbum = function(){
      CameraService.pickImage();
    };

    vm.showActionSheet = function () {
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        titleText: '照片上传',
        buttons: [
          {text: '拍照上传'},
          {text: '从相册选择'}
        ],
        //destructiveText: '删除',
        cancelText: '取消',
        cancel: function () {
          // add cancel code..
        },
        buttonClicked: function (index) {
          if (index == 0) {
            vm.getPhoto();
          }

          if (index == 1) {
            vm.getPhotoFromAlbum();
          }
          return true;
        }
      });
      // For example's sake, hide the sheet after two seconds
      $timeout(function () {
        hideSheet();
      }, 10000);

    };
  });
