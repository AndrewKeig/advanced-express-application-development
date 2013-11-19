var express = require('express')
  , http = require('http')
  , config = require('../configuration')
  , db = require('../db')
  , routes = require('../routes')
  , notFound = require('../middleware/notFound')
  , id = require('../middleware/id')
  , app = express();

app.use(express.bodyParser());
app.set('port', config.get('express:port'));
app.use(express.logger({ immediate: true, format: 'dev' }));
app.param('id', id.validate);
app.get('/heartbeat', routes.heartbeat.index);
app.get('/project/:id', routes.project.get);
app.get('/project', routes.project.all);
app.post('/project', routes.project.post);
app.put('/project/:id', routes.project.put);
app.del('/project/:id', routes.project.del);
app.get('/project/:id/repos', routes.github.repos);
app.get('/project/:id/commits', routes.github.commits);
app.get('/project/:id/issues', routes.github.issues);
app.use(notFound.index);

http.createServer(app).listen(app.get('port'));
module.exports = app;