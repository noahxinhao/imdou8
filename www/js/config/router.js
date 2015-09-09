angular.module('app.router').config(function ($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in homeCtrl.js
  $stateProvider
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
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
    .state('tab.webView', {
      url: '/web-view',
      views: {
        'tab-home': {
          templateUrl: 'templates/webView/webView.html',
          controller: 'webViewCtrl'
        }
      }
    })
    .state('tab.ad-details', {
      url: '/ad-details',
      views: {
        'tab-home': {
          templateUrl: 'templates/home/ad-details.html',
          controller: 'adDetailsCtrl'
        }
      }
    })
    .state('tab.chats', {
      url: '/chats',
      views: {
        'chat-view': {
          templateUrl: 'templates/chat/chats.html',
          controller: 'ChatCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chat-detail/:chatId',
      views: {
        'chat-view': {
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
    }).state('tab.follow', {
      url: '/follow',
      views: {
        'tab-account': {
          templateUrl: 'templates/account/follow.html',
          controller: 'followCtrl'
        }
      }
    }).state('tab.coupons', {
      url: '/coupons',
      views: {
        'tab-account': {
          templateUrl: 'templates/account/coupons.html',
          controller: 'couponsCtrl'
        }
      }
    }).state('tab.friends', {
      url: '/friends',
      views: {
        'tab-account': {
          templateUrl: 'templates/account/friends.html',
          controller: 'friendsCtrl'
        }
      }
    }).state('tab.shopping_cart', {
      url: '/shopping_cart',
      views: {
        'tab-account': {
          templateUrl: 'templates/account/shopping_cart.html',
          controller: 'shoppingCartCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
