(function () {
  'use strict';
  angular.module('app.controllers')
    .controller('HomeCtrl', function ($scope, $rootScope, baiduMapService,$timeout) {
      var vm = $scope.vm = {};

      baiduMapService.getUserCityLocation().then(function (result) {
        vm.userLocation = result;
      });

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
          "img": "img/gjj01.jpg"
        },
        {
          "img": "img/gjj02.jpg"
        },
        {
          "img": "img/gjj03.jpg"
        },
        {
          "img": "img/gjj04.jpg"
        },
        {
          "img": "img/gjj02.jpg"
        }
      ];

      vm.topicList = [
        {
          "topicName": "为您推荐",
          "details": [
            {
              "name": "贡茶",
              "url": "#/tab/ad-details",
              "imgUrl": "http://t1.s1.dpfile.com/pc/mc/6e39344171c9561d382f38afbe85fa6b(160x100)/thumb.jpg",
              "note": "[13店通用]仅售12元，价值15元代金券，全场通用，每次最多可用1张"
            },
            {
              "name": "颐风茶道",
              "url": "#/tab/ad-details",
              "imgUrl": "http://t1.s2.dpfile.com/pc/mc/5e252f409f06a89f224104551a8f6e37(160x100)/thumb.jpg",
              "note": "[13店通用]仅售16元，价值18元代金券，全场通用，每次最多可用1张"
            },
            {
              "name": "小南国",
              "url": "#/tab/ad-details",
              "imgUrl": "http://t1.s1.dpfile.com/pc/mc/71cf7333acdaecfcd0a2045e6868b89b(160x100)/thumb.jpg",
              "note": "苹果花园现已不再参与本次团购。如您还未使用，可持券至其..."
            },
            {
              "name": "北国之春",
              "url": "#/tab/ad-details",
              "imgUrl": "http://t1.s1.dpfile.com/pc/mc/6e39344171c9561d382f38afbe85fa6b(160x100)/thumb.jpg",
              "note": "金鼎路店现已不再参与本次团购。如您还未使用，可持券至其..."
            }
          ]
        }
      ];
    })
})();
