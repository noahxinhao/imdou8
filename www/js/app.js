// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in chatService.js
// 'starter.controllers' is found in homeCtrl.js
angular.module('app', ['ionic','ion-alpha-scroll', 'LocalStorageModule', 'ngIOS9UIWebViewPatch', 'ngCordova', 'app.router', 'app.controllers', 'app.constants', 'app.services', 'app.directives', 'app.filters'])
  .run(function ($ionicPlatform, pusNotificationService, socketService, appTools) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }

      navigator.splashscreen.hide();

      console.log("开始启动socket连接");
      socketService.connectServe();

      pusNotificationService.appRegister();

      //测试获取联系人是否正常
      appTools.getContacts("李志明");

      //检查微博客户端是否安装
      appTools.checkWeiboClientInstalled();
    });
  })
  .config(function ($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position("bottom");
  });

angular.module('app.router', []);
angular.module('app.constants', []);
angular.module('app.filters', []);
angular.module('app.controllers', ['monospaced.elastic', 'angularMoment', 'ion-affix']);
angular.module('app.services', []);
angular.module('app.directives', []);
