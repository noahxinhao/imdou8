angular.module('app.controllers')
  .controller('DashCtrl', function ($scope,
                                    $rootScope,
                                    $timeout,
                                    $ionicModal,
                                    AREA,
                                    appTools,
                                    ionPlatform,
                                    pusNotificationService,
                                    $q,
                                    $cordovaDialogs,
                                    $cordovaMedia,
                                    $cordovaToast) {
    var vm = $scope.vm = {};
    vm.updateData = function () {
      $timeout(function () {
        $scope.$broadcast('scroll.refreshComplete');
        console.log("加载数据");
      }, 2000);
    };

    $scope.$on('$ionicView.enter', function () {
      $rootScope.hideTabs = "fadeInUp"
    });
    vm.slideElement = [
      {
        "img": "img/TB1km1AIXXXXXaAXVXXTIPs_XXX-1125-352.png"
      },
      {
        "img": "img/TB1fTKZIXXXXXcBXVXXSutbFXXX.jpg_q50.jpg"
      },
      {
        "img": "img/TB1vbq8IXXXXXcvXVXXXXXXXXXX.jpg_q50.jpg"
      },
      {
        "img": "img/TB1kKqDIXXXXXazXVXXdIns_XXX-1125-352.jpg_q50.jpg"
      },
      {
        "img": "img/TB1vbq8IXXXXXcvXVXXXXXXXXXX.jpg_q50.jpg"
      }
    ];

    vm.location_city = "上海";
    vm.AREA = AREA;
    $ionicModal.fromTemplateUrl('templates/components/area-select.html', {
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

    vm.select_city = function (city) {
      console.log(city);
      vm.location_city = city.name;
      $scope.closeModal();
    };

    //检查网络连接
    //vm.checkConnection = function () {
    //  var q = $q.defer();
    //  var connectStatus = appTools.checkConnection();
    //  if (connectStatus.indexOf("WiFi") >= -1) {
    //    q.resolve(connectStatus);
    //  } else {
    //    q.reject(connectStatus);
    //  }
    //  return q.promise;
    //};

    ionPlatform.ready.then(function (device) {
      //vm.checkConnection().then(function(){
      //  appTools.imCordovaToast("网络环境良好");
      //},function(){
      //  appTools.imCordovaToast("请在WIFI环境使用APP,以免耗费您的流量")
      //});

      //appTools.imCordovaToast(appTools.imGetCurrentPosition());


      //var networkState = navigator.connection.type;
      //var states = {};
      //states[Connection.UNKNOWN] = 'Unknown connection';
      //states[Connection.ETHERNET] = 'Ethernet connection';
      //states[Connection.WIFI] = 'WiFi connection';
      //states[Connection.CELL_2G] = 'Cell 2G connection';
      //states[Connection.CELL_3G] = 'Cell 3G connection';
      //states[Connection.CELL_4G] = 'Cell 4G connection';
      //states[Connection.CELL] = 'Cell generic connection';
      //states[Connection.NONE] = 'No network connection';
      //appTools.imCordovaToast(states[networkState]);
    });

    //获取地理位置信息
    //alert(appTools.imGetCurrentPosition());
    //alert(appTools.checkConnection());

    //监听消息推送 防止多次注册
    if (!$rootScope.notificationIsMonitor) {
      $rootScope.notificationIsMonitor = true;
      $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
        console.log("获取消息" + JSON.stringify([notification]));
        pusNotificationService.handleNotification(notification);
        $scope.$apply(function () {
          $scope.notifications.push(JSON.stringify(notification.alert));
        })
      });
      $rootScope.$on("resume", function () {
        pusNotificationService.onResume()
      })
    }

  });
