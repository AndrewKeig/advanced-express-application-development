var express = require('express')
  , http = require('http')
  , config = require('../configuration')
  , heartbeat = require('../routes/heartbeat')
  , notFound = require('../middleware/notFound')
  , app = express();

app.set('port', config.get('express:port'));
app.use(express.logger({ immediate: true, format: 'dev' }));
app.get('/heartbeat', heartbeat.index);
app.use(notFound.index);

http.createServer(app).listen(app.get('port'));
module.exports = app;