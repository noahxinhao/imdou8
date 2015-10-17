angular.module('app.directives').directive('elasticImage', function ($ionicScrollDelegate) {
  return {
    restrict: 'A',
    link: function ($scope, $scroller, $attr) {
      var image = document.getElementById($attr.elasticImage);
      var imageHeight = image.offsetHeight;

      $scroller.bind('scroll', function (e) {
        var scrollTop = e.detail.scrollTop;
        var newImageHeight = imageHeight - scrollTop;
        if (newImageHeight < 0) {
          newImageHeight = 0;
        }
        image.style.height = newImageHeight + 'px';
      });
    }
  }
});
