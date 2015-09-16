angular.module('app.controllers')
  .controller('ChatDetailCtrl',
  function ($scope,
            $stateParams,
            $ionicHistory,
            $state,
            Chats,
            $rootScope,
            MockService,
            $ionicActionSheet,
            $ionicPopup,
            $ionicScrollDelegate,
            $timeout,
            $interval,
            $ionicPopover,
            appTools) {

    $scope.chat = Chats.get($stateParams.chatId);

    var vm = $scope.vm = {};
    vm.backToChats = function () {
      $ionicHistory.goBack();
    };

    $ionicPopover.fromTemplateUrl('templates/chat/chat-popover.html', {
      scope: $scope,
    }).then(function (popover) {
      $scope.popover = popover;
    });
    vm.chatMessages = [];
    // mock acquiring data via $stateParams
    $scope.toUser = $scope.chat;

    // this could be on $rootScope rather than in $stateParams
    $scope.user = {
      _id: '534b8fb2aa5e7afc1b23e69c',
      pic: 'img/601.jpg',
      username: 'Marty'
    };

    $scope.input = {
      message: localStorage['userMessage-' + $scope.toUser._id] || ''
    };

    var messageCheckTimer;

    var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
    var footerBar; // gets set in $ionicView.enter
    var scroller;
    var txtInput; // ^^^

    $scope.$on('$ionicView.enter', function () {
      console.log('UserMessages $ionicView.enter');

      if (!$scope.doneLoading) {
        getMessages();
      }

      $timeout(function () {
        footerBar = document.body.querySelector('#userMessagesView .bar-footer');
        scroller = document.body.querySelector('#userMessagesView .scroll-content');
        txtInput = angular.element(footerBar.querySelector('textarea'));
      }, 0);

      messageCheckTimer = $interval(function () {
        // here you could check for new messages if your app doesn't use push notifications or user disabled them
      }, 20000);
    });

    $scope.$on('$ionicView.leave', function () {
      console.log('leaving UserMessages view, destroying interval');
      // Make sure that the interval is destroyed
      if (angular.isDefined(messageCheckTimer)) {
        $interval.cancel(messageCheckTimer);
        messageCheckTimer = undefined;
      }
    });

    $scope.$on('$ionicView.beforeLeave', function () {
      if (!$scope.input.message || $scope.input.message === '') {
        localStorage.removeItem('userMessage-' + $scope.toUser._id);
      }
    });

    function getMessages() {
      // the service is mock but you would probably pass the toUser's GUID here
      MockService.getUserMessages({
        toUserId: $scope.toUser._id
      }).then(function (data) {
        $scope.doneLoading = true;
        vm.chatMessages = data.messages;

        $timeout(function () {
          viewScroll.scrollBottom();
        }, 0);
      });
    }

    $scope.$watch('input.message', function (newValue, oldValue) {
      console.log('input.message $watch, newValue ' + newValue);
      if (!newValue) newValue = '';
      localStorage['userMessage-' + $scope.toUser._id] = newValue;
    });

    $scope.sendMessage = function (sendMessageForm) {
      var message = {
        toId: $scope.toUser._id,
        text: $scope.input.message
      };

      // if you do a web service call this will be needed as well as before the viewScroll calls
      // you can't see the effect of this in the browser it needs to be used on a real device
      // for some reason the one time blur event is not firing in the browser but does on devices
      keepKeyboardOpen();

      //MockService.sendMessage(message).then(function(data) {
      $scope.input.message = '';

      message._id = new Date().getTime(); // :~)
      message.date = new Date();
      message.username = $scope.user.username;
      message.userId = $scope.user._id;
      message.pic = $scope.user.pic;

      vm.chatMessages.push(message);

      console.log(JSON.stringify(vm.chatMessages));
      $timeout(function () {
        keepKeyboardOpen();
        viewScroll.scrollBottom(true);
      }, 0);

      $timeout(function () {
        vm.chatMessages.push(MockService.getMockMessage());
        keepKeyboardOpen();
        viewScroll.scrollBottom(true);
      }, 2000);

      //});
    };

    // this keeps the keyboard open on a device only after sending a message, it is non obtrusive
    function keepKeyboardOpen() {
      console.log('keepKeyboardOpen');
      txtInput.one('blur', function () {
        console.log('textarea blur, focus back on it');
        txtInput[0].focus();
        viewScroll.scrollBottom(true);
      });
    }

    $scope.onMessageHold = function (e, itemIndex, message) {
      console.log('onMessageHold');
      console.log('message: ' + JSON.stringify(message, null, 2));
      $ionicActionSheet.show({
        buttons: [{
          text: '复制'
        }, {
          text: '删除'
        }],
        buttonClicked: function (index) {
          switch (index) {
            case 0: // Copy Text
              //cordova.plugins.clipboard.copy(message.text);

              break;
            case 1: // Delete
              // no server side secrets here :~)
              vm.chatMessages.splice(itemIndex, 1);
              $timeout(function () {
                viewScroll.resize();
              }, 0);

              break;
          }

          return true;
        }
      });
    };

    // this prob seems weird here but I have reasons for this in my app, secret!
    $scope.viewProfile = function (msg) {
      if (msg.userId === $scope.user._id) {
        // go to your profile
      } else {
        // go to other users profile
      }
    };

    // I emit this event from the monospaced.elastic directive, read line 480
    $scope.$on('taResize', function (e, ta) {
      console.log('taResize');
      if (!ta) return;

      var taHeight = ta[0].offsetHeight;
      console.log('taHeight: ' + taHeight);

      if (!footerBar) return;

      var newFooterHeight = taHeight + 10;
      newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

      footerBar.style.height = newFooterHeight + 'px';
      scroller.style.bottom = newFooterHeight + 'px';
    });

    vm.onProfilePicError = function (t) {
      appTools.onProfilePicError(t);
    }

    vm.sendMessage = function () {
      socket.emit('send:message', {
        message: $scope.message
      });

      // add the message to our model locally
      $scope.messages.push({
        user: $scope.name,
        text: $scope.message
      });

      // clear message box
      $scope.message = '';
    };
  });

// configure moment relative time
//moment.locale('en', {
//  relativeTime: {
//    future: "in %s",
//    past: "%s ago",
//    s: "%d sec",
//    m: "a minute",
//    mm: "%d minutes",
//    h: "an hour",
//    hh: "%d hours",
//    d: "a day",
//    dd: "%d days",
//    M: "a month",
//    MM: "%d months",
//    y: "a year",
//    yy: "%d years"
//  }
//});
