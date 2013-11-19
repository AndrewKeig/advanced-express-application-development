var schedule = require('node-schedule')
  , logger = require('./lib/logger')
  , Populate = require('./lib/cache/populate')
  , populate = new Populate();

schedule.scheduleJob('*/5 * * * *', function(){
	populate.run(function(err) {
		if (err) logger.error('Redis Population error', err);
		if (!err) logger.info('Redis Population complete');
	});
});