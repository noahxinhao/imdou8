angular.module('app.controllers')
  .controller('AccountCtrl', function ($scope, $ionicModal, $http, appTools, serveApi,thirdPartyLoginService) {
    var vm = $scope.vm = {};
    vm.isHideTabs = false;
    $scope.settings = {
      enableFriends: true
    };
    vm.isLogin = false;
    vm.LoginUser = {
      "account": "",
      "password": ""
    };

    //微博登陆测试
    vm.weiboLogin = function(){
      thirdPartyLoginService.weiboLogin();
    };

    vm.SignUser = {};

    $ionicModal.fromTemplateUrl('templates/account/login.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      vm.LoginModal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/account/sign-up.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      vm.SignModal = modal;
    });

    vm.showLoginModal = function () {
      vm.LoginModal.show();
      vm.SignModal.hide();
    };

    vm.showSignModal = function () {
      vm.SignModal.show();
      vm.LoginModal.hide();
    };

    vm.login = function () {
      appTools.showLoad();

      console.log(JSON.stringify(vm.LoginUser))

      appTools.httpPost(serveApi.ACCOUNT.USER_LOGIN_URL, vm.LoginUser)
        .then(function (data) {

          console.log("请求成功：" + JSON.stringify(data));

          appTools.hideLoad();

          if (data.success) {
            vm.isLogin = true;
            vm.LoginUser = data.data;

            vm.LoginModal.hide();
          } else {
            vm.handelUserLoginError(data);
          }
        }, function () {

          console.log("请求失败");

          appTools.hideLoad();

          vm.LoginModal.hide();
        })
    };

    vm.signUp = function () {
      appTools.showLoad()
      console.log(JSON.stringify(vm.SignUser))
      appTools.httpPost(serveApi.ACCOUNT.USER_SIGN_URL, vm.SignUser)
        .then(function (data) {

          console.log("请求成功" + JSON.stringify(data));

          appTools.hideLoad();

          if (data.success) {

            vm.isLogin = true;

            vm.LoginUser = data.data;

            vm.SignModal.hide();
          } else {
            vm.handelUserSignUpError(data)
          }

        }, function () {

          console.log("请求失败");

          appTools.hideLoad();

          vm.SignModal.hide();
        });
    };

    vm.handelUserLoginError = function (data) {
      if (data.code == "100001") {
        vm.loginErr = "用户名或密码错误"
      }
    };

    vm.handelUserSignUpError = function (data) {
      if (data.code == "100002") {
        vm.signUpErr = "注册失败" + data.errorDesc.split(",")[1]
      }
    }
  });
