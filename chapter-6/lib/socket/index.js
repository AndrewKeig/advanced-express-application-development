var config = require('../configuration')
, RedisStore = require('socket.io/lib/stores/redis')
, redis  = require('socket.io/node_modules/redis')
, Redis = require('../cache/redis')
, pub    = new Redis().client
, sub    = new Redis().client
, client = new Redis().client;

function Socket(server) {
    var socketio = require('socket.io').listen(server);

    if (config.get('sockets:browserclientminification')) socketio.enable('browser client minification');
    if (config.get('sockets:browserclientetag')) socketio.enable('browser client etag'); 
    if (config.get('sockets:browserclientgzip')) socketio.enable('browser client gzip');
    
    socketio.set("polling duration", config.get('sockets:pollingduration'));
    socketio.set('log level', config.get('sockets:loglevel'));
    socketio.set('transports', [
        'websocket'
        , 'flashsocket'
        , 'htmlfile'
        , 'xhr-polling'
        , 'jsonp-polling'
    ]);

    socketio.set('store', new RedisStore({
      redis    : redis
    , redisPub : pub
    , redisSub : sub
    , redisClient : client
    }));

    return socketio;
};

module.exports = Socket;