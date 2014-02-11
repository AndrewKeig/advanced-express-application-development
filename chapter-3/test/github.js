var app = require('../app')
, request = require('supertest')
, assert = require('assert')
, _ = require('underscore')
, mongoose = require('mongoose')
, login = require('./login');

describe('vision github api', function(){
  var id;

  beforeEach(function(done){
    mongoose.connection.collections['projects'].drop( function(err) {

    var proj = {
        name: "test name"
      , deleted : false
      , user: login.user    
      , token: login.token
      , repositories    : [ "node-plates" ]
    };

    mongoose.connection.collections['projects'].insert(proj, function(err, docs) {
        id = docs[0]._id;
        done();
      });
    });
  })

  describe('when requesting an available resource /project/:id/repos', function(){
    it('should respond with 200', function(done){
      this.timeout(7000);
      request(app)
        .get('/project/' + id + '/repos/')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          var repo = _.first(JSON.parse(res.text))
          assert(_.has(repo, 'id'));
          assert(_.has(repo, 'name'));
          assert(_.has(repo, 'description'));
          done();
        });
    });
  });

  describe('when requesting a resource with invalid request /project/./repos', function(){
    it('should respond with 400', function(done){
      request(app)
        .get('/project/./repos')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });

  describe('when requesting an missing resource /project/:id/repos', function(){
    it('should respond with 404', function(done){
      request(app)
        .get('/project/41224d776a326fb40f000001/repos')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
  });

  describe('when requesting an available resource /project/:id/commits', function(){
    it('should respond with 200', function(done){
      this.timeout(7000);
      request(app)
        .get('/project/' + id + '/commits')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          var commit = _.first(JSON.parse(res.text))
          assert(_.has(commit, 'message'));
          assert(_.has(commit, 'date'));
          assert(_.has(commit, 'login'));
          assert(_.has(commit, 'avatar_url'));
          assert(_.has(commit, 'ago'));
          assert(_.has(commit, 'repository'));
          done();
        });
    });
  });

  describe('when requesting a resource with invalid request /project/:id/commits', function(){
    it('should respond with 400', function(done){
      request(app)
        .get('/project/./commits')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });

  describe('when requesting an missing resource /project/:id/commits', function(){
    it('should respond with 404', function(done){
      request(app)
        .get('/project/41224d776a326fb40f000001/commits')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
  });

  describe('when requesting an available resource /project/:id/issues', function(){
    it('should respond with 200', function(done){
      this.timeout(5000);
      request(app)
        .get('/project/' + id + '/issues')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          var issue = _.first(JSON.parse(res.text))
          assert(_.has(issue, 'title'));
          assert(_.has(issue, 'state'));
          assert(_.has(issue, 'updated_at'));
          assert(_.has(issue, 'login'));
          assert(_.has(issue, 'avatar_url'));
          assert(_.has(issue, 'ago'));
          assert(_.has(issue, 'repository'));
          done();
        });
    });
  });

  describe('when requesting a resource with invalid request /project/:id/issues', function(){
    it('should respond with 400', function(done){
      request(app)
        .get('/project/./issues')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });

  describe('when requesting an missing resource /project/:id/issues', function(){
    it('should respond with 404', function(done){
      request(app)
        .get('/project/41224d776a326fb40f000001/issues')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
  });
});
