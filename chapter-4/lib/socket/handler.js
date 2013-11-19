var http = require('http') 
  , logger = require("../logger")
  , Socket = require('../socket')
  , Subscriber = require('../cache/subscriber')
  , subscriber = new Subscriber();

function SocketHandler(httpServer) {

  var socketIo = new Socket(httpServer)

  socketIo.sockets.on('connection', function(socket) {
    subscriber.subscribe("issues");
    subscriber.subscribe("commits");

    subscriber.client.on("message", function (channel, message) {
      socket.broadcast.to(message.projectId).emit(channel, JSON.parse(message));
    });

    socket.on('subscribe', function (data) {
      socket.join(data.channel);
    });

    socket.on('unsubscribe', function () {
      var rooms = socketIo.sockets.manager.roomClients[socket.id];

      for (var room in rooms) {
          if (room.length > 0) {
            room = room.substr(1); 
            socket.leave(room);
          }
      }
    });
  });

  socketIo.sockets.on('error', function() { 
    logger.error(arguments);
  });
}; 

module.exports = SocketHandler;