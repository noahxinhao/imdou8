(function () {
  angular.module('app.services')
    .factory('baiduMapService', function ($q) {
      return {
        //获取用户所在城市
        getUserCityLocation: function () {
          var deferred = $q.defer();

          var map = new BMap.Map("baiduMap");
          var point = new BMap.Point(116.331398,39.897445);
          map.centerAndZoom(point,12);

          function myFun(result){
            var cityName = result.name;
            map.setCenter(cityName);
            console.log("当前定位城市:"+cityName);
            deferred.resolve(cityName)
          }

          var myCity = new BMap.LocalCity();

          myCity.get(myFun);

          return deferred.promise;
        }
      }
    })
})();
