var GitHubApi = require('github')
, config = require('../configuration')
, async =  require('async')
, moment = require('moment')
, _ =  require('underscore')

function GitHubRepo(token, user) {
  this.token = token;
  this.user = user;

  this.github = new GitHubApi({
    version: "3.0.0",
    timeout: 5000 });

  this.github.authenticate({
    type: "oauth",
    token: token
  });
};

GitHubRepo.prototype.repositories = function(callback) {
  this.github.repos.getAll({}, function(error, response) {
    if (error) return callback(error, null);
    if (response == null) return callback(null, null);

    var items = response.map(function(model) {
       return _.pick(model, ['id','name', 'description']);
    });

    callback(null, items );
  });
};

GitHubRepo.prototype.issues = function(repos, callback) {
  var me = this;
  var items = [];

  async.each(repos, function(repo, callback) {
    me.github.issues.repoIssues({ user: me.user, repo: repo }, function(error, response) {
      if (error) return callback();
      if (response == null) return callback();

      var repoItems = response.map(function(model) {
         var item = _.pick(model, ['title', 'state', 'updated_at']);
         if (model.user) _.extend(item, _.pick(model.user, ['login', 'avatar_url']));
         item.ago = moment(item.updated_at).fromNow();
         item.repository = repo;
         return item;
      });

      items = _.union(items, repoItems);
      callback(null, items );
    });
  }
  , function(error) {
      var top = _.chain(items)
      .sortBy(function(item){ return item.updated_at; })
      .reverse()
      .first(10)
      .value();

      callback(error, top);
  });
};

GitHubRepo.prototype.commits = function(repos, callback) {
  var me = this;
  var items = [];

  async.each(repos, function(repo, callback) {
    me.github.repos.getCommits({ user: me.user, repo: repo }, function(error, response) {
      if (error) return callback();
      if (response == null) return callback();
      
      var repoItems = response.map(function(model) {
        var item =_.pick(model.commit, ['message']);
        if (model.commit.committer) _.extend(item, _.pick(model.commit.committer, ['date']));
        if (model.committer) _.extend(item, _.pick(model.committer, ['login', 'avatar_url']));
        item.ago = moment(item.date).fromNow();
        item.repository  = repo;
        return item;
      });

      items = _.union(items, repoItems);
      callback(null, items );
    });
  }
  , function(error) {
      var top = _.chain(items)
      .sortBy(function(item){ return item.date })
      .reverse()
      .first(10)
      .value();

      callback(error, top);
  });
};

module.exports = GitHubRepo;