angular.module('app.filters').filter('suport', function () {
  return function (city) {
    var array = [];
    city.forEach(function(city) {
      if(city.status==1){
        array.push(city);
      }
    });
    return array;
  };
});