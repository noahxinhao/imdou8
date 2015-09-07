angular.module('app.services', [])

  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      _id: 0,
      username: 'Ben Sparrow',
      lastText: 'You on your way?',
      pic: 'img/m1.jpg'
    }, {
      _id: 1,
      username: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      pic: 'img/m2.jpg'
    }, {
      _id: 2,
      username: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      pic: 'img/m3.jpg'
    }, {
      _id: 3,
      username: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      pic: 'img/m4.jpg'
    }, {
      _id: 4,
      username: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      pic: 'img/m5.jpg'
    }];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i]._id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  });
