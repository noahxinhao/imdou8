angular.module('app.router').config(function ($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in dashCtrl.js
  $stateProvider
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('chatView', {
      url: '/chatView',
      abstract: true,
      templateUrl: 'templates/chat/chats-view.html'
    })
    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/home/home.html',
          controller: 'DashCtrl'
        }
      }
    })
    .state('chatView.chats', {
      url: '/chats',
      views: {
        'chats-view': {
          templateUrl: 'templates/chat/chats.html',
          controller: 'ChatCtrl'
        }
      }
    })
    .state('chatView.chat-detail', {
      url: '/chat-detail/:chatId',
      views: {
        'chats-view': {
          templateUrl: 'templates/chat/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/account/account.html',
          controller: 'AccountCtrl'
        }
      }
    })
    .state('tab.wallet', {
      url: '/wallet',
      views: {
        'tab-account': {
          templateUrl: 'templates/account/wallet.html',
          controller: 'walletCtrl'
        }
      }
    })
    .state('tab.bank-card', {
      url: '/bank-card',
      views: {
        'tab-account': {
          templateUrl: 'templates/account/bank-card.html',
          controller: 'bankCardCtrl'
        }
      }
    })
    .state('tab.account-setting', {
      url: '/account-setting',
      views: {
        'tab-account': {
          templateUrl: 'templates/account/account-setting.html',
          controller: 'accountSettingCtrl'
        }
      }
    }).state('tab.webView', {
      url: '/web-view',
      views: {
        'tab-home': {
          templateUrl: 'templates/webView/webView.html',
          controller: 'webViewCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
