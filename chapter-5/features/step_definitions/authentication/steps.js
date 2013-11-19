var Browser = require('zombie')
, assert = require('assert')
, S = require('string')
, config = require('../../../lib/configuration');

var steps = function() {
  var silent = true;
  var debug = false;
  var Given = When = Then = this.defineStep;
  var browser = null;
  var me = this;

   this.Before(function(callback) {
     browser = new Browser();
     browser.setMaxListeners(20);
     setTimeout(callback(), 5000);
   });

  this.Given(/^I have a GitHub Account$/, function(callback) {    
    browser.visit('https://github.com/login', {silent: silent, debug: debug});
    
    browser.wait(function(){  
      browser
        .fill('login', '#USER#')
        .fill('password', '#PASSWORD#')
        .pressButton('Sign in', function() {
          callback();
        });
    });
  });

  this.When(/^I click the GitHub authentication button$/, function(callback) {
    browser.visit(config.get('auth:homepage'), {silent: silent, debug: debug});
    
    browser.wait(function(){   
      browser
        .clickLink('#login', function() {
        callback();
      });
    });
  });

  this.Then(/^I should be logged in$/, function(callback) {
    assert.ok(browser.success);
    callback();
  });

  this.Then(/^I should see my name and a logout link$/, function(callback) {
    assert.equal(browser.text('#welcome'), 'welcome Andrew Keig, click here to sign out');
    callback();
  });


  this.Given(/^I am logged in to Vision$/, function(callback) {
    browser.visit(config.get('auth:homepage'), {silent: silent, debug: debug});
    
    browser.wait(function(){   
      browser
        .clickLink('#login', function() {
        callback();
      });
    });
  });

  this.When(/^I click the logout button$/, function(callback) {
    browser.visit(config.get('auth:homepage'), {silent: silent, debug: debug});
    
    browser.wait(function(){   
      browser
        .clickLink('#logout', function(err) {
        callback();
      });
    });
  });

  this.Then(/^I should see the GitHub login button$/, function(callback) {
    assert.ok(browser.success);
    var containsLogin = S(browser.html('#login')).contains('vision/github.png')
    assert.equal(true, containsLogin);
    callback();
  });
};

module.exports = steps;