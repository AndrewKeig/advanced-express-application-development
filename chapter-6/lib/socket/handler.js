var http = require('http') 
  , logger = require("../logger")
  , Socket = require('../socket')
  , Subscriber = require('../cache/subscriber')
  , subscriber = new Subscriber()
  , SessionSockets = require('session.socket.io');

function SocketHandler(httpServer, sessionStore, cookieParser) {

  var socketIo = new Socket(httpServer)
  var sessionSockets = new SessionSockets(socketIo, sessionStore, cookieParser);

  sessionSockets.on('connection', function(err, socket, session) {
    subscriber.subscribe("issues");
    subscriber.subscribe("commits");

    subscriber.client.on("message", function (channel, message) {
      console.log('sending message to client', JSON.parse(message).projectId);
      socket.broadcast.to(JSON.parse(message).projectId).emit(channel, JSON.parse(message));
    });

    socket.on('subscribe', function (data) {
      var user = session ? session.passport.user : null;
      if (!user) return;

      console.log('subscribing to ', data.channel);
      socket.join(data.channel);
      session.touch();
    });

    socket.on('unsubscribe', function () {
      var rooms = socketIo.sockets.manager.roomClients[socket.id];

      for (var room in rooms) {
          if (room.length > 0) {
            console.log('unsubscribing from ', room);  
            room = room.substr(1); 
            socket.leave(room);
          }
      }

      session.touch();
    });
  });

  sessionSockets.on('error', function() { 
    logger.error(arguments);
  });
}; 

module.exports = SocketHandler;