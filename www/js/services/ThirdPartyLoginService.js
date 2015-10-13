angular.module('app.services', [])
  .factory('thirdPartyLogin', function () {
    return {
      weiboLogin: function () {
        //YCWeibo.ssoLogin(function (args) {
        //  //alert(args.access_token);
        //  //alert(args.userid);
        //  console.log(JSON.stringify(args))
        //  return args;
        //}, function (failReason) {
        //  console.log(failReason);
        //});
      }
    };
  });
