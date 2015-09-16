angular.module('app.services').factory('appTools', function ($cordovaDialogs,
                                                             $cordovaMedia,
                                                             $cordovaToast,
                                                             localStorageService,
                                                             $ionicLoading,
                                                             $ionicPopup, $timeout) {
  return {
    imGetCurrentPosition: function () {
      //获取地理位置信息
      var onSuccess = function (position) {
        var position = {};
        position.Latitude = position.coords.latitude;
        position.Longitude = position.coords.longitude;
        position.Altitude = position.coords.altitude;
        position.Accuracy = position.coords.accuracy;
        position.AltitudeAccuracy = position.coords.altitudeAccuracy;
        position.Heading = position.coords.heading;
        position.Timestamp = position.coords.timestamp;

        return position;
      };

      var onError = function (err) {
        var er = {};
        er.code = error.code;
        er.message = error.error.message;
        return er;
      };

      var result = navigator.geolocation.getCurrentPosition(onSuccess, onError);
      console.log(result);
      return result;
    },
    confirm: function (message) {
      $ionicPopup.confirm({
        title: '<strong>提醒消息</strong>',
        template: message,
        okText: '退出',
        cancelText: '取消'
      });
    },
    cordovaToast: function (str) {
      $cordovaToast.showShortCenter(str);
    },
    setStorage: function (key, value) {
      localStorageService.set(key, value);
    },
    getStorage: function (key) {
      return localStorageService.get(key);
    },
    checkConnection: function () {
      var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI] = 'WiFi connection';
      states[Connection.CELL_2G] = 'Cell 2G connection';
      states[Connection.CELL_3G] = 'Cell 3G connection';
      states[Connection.CELL_4G] = 'Cell 4G connection';
      states[Connection.CELL] = 'Cell generic connection';
      states[Connection.NONE] = 'No network connection';
      return states[networkState];
    },
    onProfilePicError: function (ele) {
      this.ele.src = ''; // set a fallback
    },
    getMockMessages: function () {
      return {
        "messages": [{
          "_id": "0",
          "text": "Ionic has changed the game for hybrid app development.",
          "userId": "534b8fb2aa5e7afc1b23e69c",
          "date": "2014-04-27T20:02:39.082Z",
          "read": true,
          "readDate": "2014-12-01T06:27:37.944Z"
        }, {
          "_id": "1",
          "text": "I like Ionic better than ice cream!",
          "userId": "534b8e5aaa5e7afc1b23e69b",
          "date": "2014-04-29T02:52:47.706Z",
          "read": true,
          "readDate": "2014-12-01T06:27:37.944Z"
        }, {
          "_id": "2",
          "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "userId": "534b8fb2aa5e7afc1b23e69c",
          "date": "2014-11-17T20:19:15.289Z",
          "read": true,
          "readDate": "2014-12-01T06:27:38.328Z"
        }, {
          "_id": "3",
          "text": "Am I dreaming?",
          "userId": "534b8e5aaa5e7afc1b23e69b",
          "date": "2014-11-26T21:18:17.591Z",
          "read": true,
          "readDate": "2014-12-01T06:27:38.337Z"
        }, {
          "_id": "4",
          "text": "Is this magic?",
          "userId": "534b8fb2aa5e7afc1b23e69c",
          "date": "2014-11-26T21:18:38.549Z",
          "read": true,
          "readDate": "2014-12-01T06:27:38.338Z"
        }, {
          "_id": "1",
          "text": "Gee wiz, this is something special.",
          "userId": "534b8e5aaa5e7afc1b23e69b",
          "date": "2014-11-28T06:27:40.001Z",
          "read": true,
          "readDate": "2014-12-01T06:27:38.338Z"
        }, {
          "_id": "2",
          "text": "I think I like Ionic more than I like ice cream!",
          "userId": "534b8fb2aa5e7afc1b23e69c",
          "date": "2014-11-28T06:55:37.350Z",
          "read": true,
          "readDate": "2014-12-01T06:27:38.338Z"
        }, {
          "_id": "3",
          "text": "Yea, it's pretty sweet",
          "userId": "534b8e5aaa5e7afc1b23e69b",
          "date": "2014-11-28T06:56:36.472Z",
          "read": true,
          "readDate": "2014-12-01T06:27:38.338Z"
        }, {
          "_id": "1",
          "text": "Wow, this is really something huh?",
          "userId": "534b8fb2aa5e7afc1b23e69c",
          "date": "2014-11-28T20:48:06.572Z",
          "read": true,
          "readDate": "2014-12-01T06:27:38.339Z"
        }, {
          "_id": "4",
          "text": "Create amazing apps - ionicframework.com",
          "userId": "534b8e5aaa5e7afc1b23e69b",
          "date": "2014-11-29T06:56:36.472Z",
          "read": true,
          "readDate": "2014-12-01T06:27:38.338Z"
        }], "unread": 0
      };
    },
    handelChatNotification: function () {

    },
    handelTargetUrlNotification: function (url) {
      this.loadPage(url);
    },
    loadPage: function (url) {
      window.location.href = url;
    },
    showLoad: function () {
      $ionicLoading.show({
        template: '<ion-spinner icon="ios"></ion-spinner>'
      });
    },
    //隐藏load
    hideLoad: function () {
      $ionicLoading.hide();
    },
  }
}).factory(("ionPlatform"), function ($q) {
  var ready = $q.defer();

  ionic.Platform.ready(function (device) {
    ready.resolve(device);
  });

  return {
    ready: ready.promise
  }
}).factory(("barcodeScanner"), function () {
  return{
    scan:function(){
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          alert("We got a barcode\n" +
            "Result: " + result.text + "\n" +
            "Format: " + result.format + "\n" +
            "Cancelled: " + result.cancelled);
        },
        function (error) {
          alert("Scanning failed: " + error);
        }
      );
    }
  }
});
