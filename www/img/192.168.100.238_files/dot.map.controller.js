(function () {
  'use strict';
  angular.module('app.controllers')
    .controller('DotMapCtrl', function ($scope, $ionicHistory, $window, $timeout) {
      var vm = $scope.vm = {};
      vm.backToHome = function () {
        $ionicHistory.goBack();
      };

      vm.dotAddress = {};
      vm.map = {};
      //创建map
      vm.loadMap = function (mapId) {
        if ($window.BMap) {
          vm.map = new BMap.Map(mapId);
          var point = new BMap.Point(111.463842, 31.218575);
          vm.map.centerAndZoom(point, 18);
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300, 157));

              var mk = new BMap.Marker(r.point, {icon: myIcon});

              vm.map.addOverlay(mk);

              mk.setAnimation(BMAP_ANIMATION_BOUNCE);

              vm.map.panTo(r.point);

              var pt = r.point;

              var geoc = new BMap.Geocoder();

              geoc.getLocation(pt, function (rs) {
                var addComp = rs.addressComponents;
                $timeout(function () {
                  vm.dotAddress.province = addComp.province;
                  vm.dotAddress.city = addComp.city;
                  vm.dotAddress.district = addComp.district;
                  vm.dotAddress.street = addComp.street;
                  vm.dotAddress.streetNumber = addComp.streetNumber;

                  //路线
                  var driving = new BMap.DrivingRoute(vm.map, {
                    renderOptions: {map: vm.map, autoViewport: true},
                    policy: 'BMAP_DRIVING_POLICY_LEAST_TIME'
                  });

                  var start = vm.dotAddress.street + vm.dotAddress.streetNumber;
                  console.log(start);
                  driving.search(start, "老西门");

                  //添加地图控件
                  var mapType1 = new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]});
                  vm.map.addControl(mapType1);          //2D图，卫星图

                  var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT});
                  vm.map.addControl(top_right_navigation);

                }, 0);
              });
            } else {
              console.log('failed' + this.getStatus());
            }
          }, {enableHighAccuracy: true});
        } else {
          console.log("初始化地图失败")
        }
      };

      //加载地图
      vm.loadMap('container');


    })
})();
