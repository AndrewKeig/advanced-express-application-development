var logger = require("../logger")
, S = require('string')
, login = require('../../test/login')
, ProjectService = require('../project')
, Project = new ProjectService();

exports.all = function(req, res){
  logger.info('Request.' + req.url);

  var userId = login.user || req.query.user || req.user.id;

  Project.all(userId, function(error, projects) {
    if (error) return res.json(500, 'Internal Server Error');
    if (projects == null) projects = {};
    return res.json(200, projects);
  });
};

exports.get = function(req, res){
  logger.info('Request.' + req.url);

  Project.get(req.params.id, function(error, project) {
    if (error) return res.json(500, 'Internal Server Error');
    if (project == null) return res.json(404, 'Not Found');
    return res.json(200, project);
  });
};

exports.put = function(req, res){
  logger.info('Put.' + req.params.id);

  if (S(req.body.name).isEmpty() ) return res.json(400, 'Bad Request');

  req.body.user = login.user;
  req.body.token = login.token;

  Project.put(req.params.id, req.body, function(error, project) {
    if (error) return res.json(500, 'Internal Server Error');
    if (project == null) return res.json(404, 'Not Found');
    return res.json(204, 'No Content');
  });
};

exports.post = function(req, res){
  logger.info('Post.' + req.body.name);

  if (S(req.body.name).isEmpty() ) return res.json(400, 'Bad Request');

  req.body.user = login.user;
  req.body.token = login.token;

  Project.post(req.body.name, req.body, function(error, project) {
    if (error) return res.json(500, 'Internal Server Error');
    if (project == null) return res.json(409, 'Conflict');
    res.location('/project/' +  project._id);
    return res.json(201, project);
  });
};

exports.del = function(req, res){
  logger.info('Delete.' + req.params.id);

  Project.del(req.params.id, function(error, project) {
    if (error) return res.json(500, 'Internal Server Error');
    if (project == null) return res.json(404, 'Not Found');
    return res.json(204, 'No Content');
  });
};