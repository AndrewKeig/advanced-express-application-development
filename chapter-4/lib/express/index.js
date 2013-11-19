var express = require('express')
  , cons = require('consolidate')
  , path = require('path')
  , http = require('http')
  , config = require('../configuration')
  , db = require('../db')
  , routes = require('../routes')
  , notFound = require('../middleware/notFound')
  , id = require('../middleware/id')
  , SocketHandler = require('../socket/handler')
  , app = express();

app.set('port', config.get('express:port'));
app.use(express.logger({ immediate: true, format: 'dev' }));
app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', 'views');
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static('public'));
app.use(express.static('public/components'));
app.use('/bootstrap', express.static('public/components/bootstrap/docs/assets/css'));
app.use('/sockets', express.static('public/components/socket.io-client/dist/'));

app.param('id', id.validate);
app.get('/', routes.home.index);
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


var httpServer = http.createServer(app).listen(app.get('port'))
socketHandler = new SocketHandler(httpServer);
  
module.exports = app;