var express = require('express')
, helmet = require('helmet');

function Security(app) {
  if (process.env['NODE_ENV'] === "TEST"  || 
    process.env['NODE_ENV'] === "COVERAGE") return;

  app.use(helmet.xframe());
  app.use(helmet.hsts());
  app.use(helmet.iexss());
  app.use(helmet.contentTypeOptions());
  app.use(helmet.cacheControl());
  app.use(express.csrf());

}; 

module.exports = Security;