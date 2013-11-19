var Redis = require('../../cache/redis')
  , util = require('util');

util.inherits(Subscriber, Redis);

function Subscriber() {
  Redis.apply(this, arguments);
};

Subscriber.prototype.subscribe = function(key) {
  this.client.subscribe(key);
};

module.exports = Subscriber;