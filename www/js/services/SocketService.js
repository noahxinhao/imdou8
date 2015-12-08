angular.module('app.services').factory('socketService', function () {
  return {
    connectServe: function () {
      var socket = io.connect('http://121.42.172.20:9098', {'force new connection': true});

      socket.on('connect', function () {
        console.log("连接服务器成功");
      });

      socket.on('chatevent', function (data) {
        console.log("获取服务器chatevent事件通知" + JSON.stringify(data));
        //cordova.plugins.notification.local.schedule({
        //  id: 1,
        //  title: "Production Jour fixe",
        //  text: "Duration 1h",
        //  firstAt: monday_9_am,
        //  every: "week",
        //  sound: "file://sounds/reminder.mp3",
        //  icon: "http://icons.com/?cal_id=1",
        //  data: data
        //});

        //cordova.plugins.notification.local.on("click", function (notification) {
        //  //joinMeeting(notification.data.meetingId);
        //});

      });

      socket.on('disconnect', function () {
        console.log("断开服务器连接")
      });
    }
  }
});
