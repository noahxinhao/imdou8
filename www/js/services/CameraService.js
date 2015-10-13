angular.module('app.services').factory('CameraService', function ($q, $cordovaCamera) {
  return {
    getPicture: function (sourceType) {
      var q = $q.defer();
      var options = {
        quality: 100,
        //destinationType: Camera.DestinationType.DATA_URL,
        allowEdit: true,
        //encodingType: Camera.EncodingType.JPEG,
        targetWidth: 1024,
        targetHeight: 1024,
        //popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true,
      };

      if (sourceType == "camera") {
        options.sourceType = Camera.PictureSourceType.CAMERA;
      }
      if (sourceType == "photolibrary") {
        options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY
      }

      $cordovaCamera.getPicture(options).then(function (imageData) {
        console.log(imageData);
        q.resolve(imageData);
      }, function (err) {
        q.reject(err);
        // error
      });
      return q.promise;
    }
  }
});
