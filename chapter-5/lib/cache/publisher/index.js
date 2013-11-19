var Redis = require('../../cache/redis')
  , util = require('util');

util.inherits(Publisher, Redis);

function Publisher() {
  Redis.apply(this, arguments);
};

Redis.prototype.save = function(key, items){
	this.client.set(key, JSON.stringify(items) );
};

Redis.prototype.publish = function(key, items){
	this.client.publish(key, JSON.stringify(items) );
};

module.exports = Publisher;
