  var fs = require('fs')
  , https = require('https');

function Server(app){
  var httpsOptions = {
    key: fs.readFileSync('./lib/secure/key.pem'),
    cert: fs.readFileSync('./lib/secure/cert.pem')
  };

  return https.createServer(httpsOptions,app).listen(app.get('port'));
}

module.exports = Server;
