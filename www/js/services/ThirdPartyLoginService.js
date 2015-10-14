angular.module('app.services').factory('thirdPartyLoginService', function () {
    return {
        weiboLogin: function () {
            YCWeibo.ssoLogin(function (args) {
                //alert(args.access_token);
                //alert(args.userid);
                console.log(JSON.stringify(args))
            }, function (failReason) {
                console.log(failReason);
            });
        }
    }
});
