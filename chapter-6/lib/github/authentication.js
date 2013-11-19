var async =require('async')
, GitHubRepo = require('../github')
, config = require('../configuration');

function GitHubAuth() {
  this.passport = require('passport')
  var GitHubStrategy = require('passport-github').Strategy;

  this.passport.use(new GitHubStrategy({
      clientID     : config.get('auth:clientId'),
      clientSecret : config.get('auth:clientSecret'),
      callbackURL  : config.get('auth:callback')
    },
    function(accessToken, refreshToken, profile, done) {

      var user = { 
        id : profile.username,
        displayName : profile.displayName,
        token : accessToken
      };

      var git = new GitHubRepo(user.token, user.id);

      git.updateTokens(function(){
        process.nextTick(function () {
          return done(null, user);
        });
      });
    }
  ));

  this.passport.serializeUser(function(user, done) {
    done(null, user);
  });

  this.passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};

module.exports = new GitHubAuth();