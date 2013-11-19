var redis = require('redis')
, config = require('../configuration');

function Redis() {
  this.port = config.get("redis:port");
  this.host = config.get("redis:host");
  this.password = config.get("redis:password");
  this.client = redis.createClient(this.port, this.host);
  if (this.password) this.client.auth(this.password, function() {});
}

module.exports = Redis;