var express = require('express')
  , cons = require('consolidate')
  , path = require('path')
  , config = require('../configuration')
  , db = require('../db')
  , routes = require('../routes')
  , middleware = require('../middleware')
  , SocketHandler = require('../socket/handler')
  , gitHubAuth = require('../github/authentication')
  , app = express()
  , Redis = require('../cache/redis')
  , redis = new Redis()
  , RedisStore = require('connect-redis')(express);

app.set('port', config.get('express:port'));
app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', 'views');
app.use(express.logger({ immediate: true, format: 'dev' }));

var cookieParser = express.cookieParser(config.get('session:secret'))
app.use(cookieParser);
app.use(express.bodyParser());

var sessionStore = new RedisStore({client: redis.client});
app.use(express.session({ store: sessionStore,
  secret: config.get('session:secret'), 
  cookie: { secure: config.get('session:secure'),
  httpOnly: config.get('session:httpOnly'), 
  maxAge: config.get('session:maxAge') }}));

app.use(gitHubAuth.passport.initialize());
app.use(gitHubAuth.passport.session());

require('../security')(app);

app.use(app.router);
app.use(express.static('public'));
app.use(express.static('public/components'));
app.use('/bootstrap', express.static('public/components/bootstrap/docs/assets/css'));
app.use('/sockets', express.static('public/components/socket.io-client/dist/'));
app.param('id', middleware.id.validate);
app.all('*', middleware.projectForm.addToken);
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
app.get('/auth/github', gitHubAuth.passport.authenticate('github'), routes.auth.login);
app.get('/auth/github/callback', gitHubAuth.passport.authenticate('github', { failureRedirect: '/' }), routes.auth.callback);
app.get('/logout', routes.auth.logout);
app.use(middleware.notFound.index);

var httpServer = require('./server')(app);
var socketHandler = new SocketHandler(httpServer, sessionStore, cookieParser);
  
module.exports = app;