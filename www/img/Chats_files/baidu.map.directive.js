(function () {
  angular.module('app.directives').directive('baiduMap', function ($window, $timeout, $q) {
    return {
      restrict: "AE",
      replace: true,
      template: "",
      scope: {
        myAddr: "="
      },
      link: function (scope, element, attrs) {
        createMap();

        function createMap() {
          loadBMaps();
        }

        function loadBMaps() {
          console.log("map: start loading js bmaps");
          if (!$window.BMap) {
            console.log("map: not available - load now bmap js");
          } else {
            console.log("map: IS available - create only map now");
            loadMap();
          }
        }

        function loadMap() {
          var map = new BMap.Map("container");
          var point = new BMap.Point(111.463842, 31.218575);
          map.centerAndZoom(point, 18);
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              var mk = new BMap.Marker(r.point);
              map.addOverlay(mk);
              map.panTo(r.point);

              var pt = r.point;
              var geoc = new BMap.Geocoder();
              geoc.getLocation(pt, function (rs) {
                var addComp = rs.addressComponents;
                $timeout(function () {
                  scope.myAddr = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
                  console.log(scope.myAddr)
                }, 0);
              });
            }
            else {
              console.log('failed' + this.getStatus());
            }
          }, {enableHighAccuracy: true})
        }
      }
    }
  });
})();
