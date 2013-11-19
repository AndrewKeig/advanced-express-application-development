var app = require('../app')
, request = require('supertest');

describe('vision', function(){
  describe('when requesting resource /heartbeat', function(){
    it('should respond with 200', function(done){
      request(app)
        .get('/heartbeat')
        .expect(200, done);
    });
  });

  describe('when requesting resource /missing', function(){
    it('should respond with 404', function(done){
      request(app)
        .get('/missing')
        .expect(404, done);
    })
  });
});