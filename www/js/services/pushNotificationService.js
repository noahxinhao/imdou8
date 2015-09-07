angular.module('app.services').factory('pusNotificationService', function ($cordovaDialogs,
                                                                           $cordovaMedia,
                                                                           $cordovaToast,
                                                                           $location,
                                                                           $cordovaPush,
                                                                           appTools) {
  return {
    appRegister: function () {
      var isRegistered = appTools.getStorage("isRegistered");
      //if (!isRegistered) {
      var config = {
        "badge": "true",
        "sound": "true",
        "alert": "true"
      };
      $cordovaPush.register(config).then(function (result) {
        console.log("Register success " + result);
        alert(result);
        if (ionic.Platform.isIOS()) {
          $scope.regId = result;
          //vm.storeDeviceToken("ios");//保存token到服务器
        }
      }, function (err) {
        console.log("Register error " + err)
      });
      //}
    },
    handleNotification: function (notification) {
      console.log("notification.foreground====>" + notification.foreground);
      if (notification.foreground == "1") {
        if (notification.badge) {
          $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
            console.log("Set badge success " + result)
          }, function (err) {
            console.log("Set badge error " + err)
          });
        }
        console.log("alert消息");
        if (!(notification.messageType == "chat")) {
          $cordovaDialogs.confirm(JSON.stringify(notification.body), "消息提醒", ['取消', '查看']).then(function (result) {
            var btnIndex = result;
            if (btnIndex == "2") {
              appTools.handelTargetUrlNotification(notification.url);
            }
          });
        } else {
          //检查界面是不是在chat-view页面等操作
          console.log("收到一条聊天消息");
        }
      } else {//app从关闭到激活状态
        if (!(notification.messageType == "chat")) {
          appTools.handelTargetUrlNotification(notification.url);
        } else {
          //处理收取消息操作
          console.log("处理app从关闭到激活状态的聊天消息")
        }
      }
    }
  }
});
