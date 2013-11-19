module.exports = (process.env['NODE_ENV'] === "COVERAGE")
 ? require('./lib-cov/express') 
 : require('./lib/express');