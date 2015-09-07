angular.module('app.services').factory('CameraService',function ($q, $cordovaCamera) {
  return {
    getPicture: function () {
      var q = $q.defer();
      console.log("启动摄像头");
      var options = {
        quality: 100,
        //destinationType: Camera.DestinationType.DATA_URL,
        //sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        //encodingType: Camera.EncodingType.JPEG,
        targetWidth: 1024,
        targetHeight: 1024,
        //popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        console.log(imageData);
        q.resolve(imageData);
      }, function (err) {
        q.reject(err);
        // error
      });
      return q.promise;
    },

    pickImage: function () {
      var options = {
        maximumImagesCount: 1,
        width: 800,
        height: 800,
        quality: 80
      };
      alert(ImagePicker);
      ImagePicker.getPictures(options).then(function(results) {
        var uri = results[0],
          name = uri;
        if (name.indexOf('/')) {
          var i = name.lastIndexOf('/');
          name = name.substring(i + 1);
        }

      }, function(error) {
        alert(error);
      });
    }
  }
});
