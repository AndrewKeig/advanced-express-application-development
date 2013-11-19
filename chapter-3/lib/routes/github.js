var logger = require('../logger')
, S = require('string')
, ProjectService = require('../project')
, Project = new ProjectService();

exports.repos = function(req, res){
  logger.info('Request.' + req.url);

  Project.repos(req.params.id, function(error, repos) {
    if (error) return res.json(500, 'Internal Server Error');
    if (repos == null) return res.json(404, 'Not Found');
    return res.json(200, repos);
  });
};

exports.commits = function(req, res){
  logger.info('Request.' + req.url);

  Project.commits(req.params.id, function(error, commits) {
    if (error) return res.json(500, 'Internal Server Error');
    if (commits == null) return res.json(404, 'Not Found');
    return res.json(200, commits);
  });
};

exports.issues = function(req, res){
  logger.info('Request.' + req.url);

  Project.issues(req.params.id, function(error, issues) {
    if (error) return res.json(500, 'Internal Server Error');
    if (issues == null) return res.json(404, 'Not Found');
    return res.json(200, issues);
  });
};