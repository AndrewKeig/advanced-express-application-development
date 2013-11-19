var async =  require('async')
  , _ =  require('underscore')
  , util = require('util')
  , db = require('../db')
  , Publisher = require('../cache/publisher')
  , GitHubRepo = require('../github')
  , Project = require('../models').model('Project');


util.inherits(Populate, Publisher);

function Populate() {
  Publisher.apply(this, arguments);
};

Populate.prototype.run = function(callback) {
  var me = this;

  Project.find({}, function(error, projects) {
      if (error) callback();
      if (projects == null) callback();

    async.each(projects, function(project, callback) {
      var git = new GitHubRepo(project.token, project.user);
    
      git.commits(project.repositories, function(error, commits){
        if (error || !commits) callback();

        me.save('commits:' + project._id, commits);
        me.publish('commits', { projectId : project._id, commits : commits } );

        git.issues(project.repositories, function(error, issues){
          if (error || !issues) callback();

          me.save('issues' + project._id, issues);
          me.publish('issues', { projectId : project._id, issues : issues } );
        });
      });

      callback(error);
    }
    , function(error) {
        callback(error);
    });
  });
};

module.exports = Populate;