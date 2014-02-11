var app = require('../app'),
    request = require('supertest'),
    assert = require('assert'),
    mongoose = require('mongoose'),
    login = require('./login');

describe('Vision Project API', function() {
    var id;

    beforeEach(function(done) {
        mongoose.connection.collections['projects'].drop(function(err) {

            var proj = {
                name: "test name",
                user: login.user,
                token: login.token,
                repositories: ["node-plates"]
            };

            mongoose.connection.collections['projects'].insert(proj, function(err, docs) {
                id = docs[0]._id;
                done();
            });
        });
    });

    describe("When creating a new resource /project", function() {
        var project = {
            name: "New Project",
            user: login.user,
            token: login.token,
            repositories: ["12345", "9898"]
        };

        it("should responsd with 201", function(done) {
            request(app).post("/project").send(project).expect("Content-Type", /json/).expect(201).end(function(err, res) {
                var proj = JSON.parse(res.text);
                assert.equal(proj.name, project.name);
                assert.equal(proj.user, login.user);
                assert.equal(proj.token, login.token);
                assert.equal(proj.repositories[0], project.repositories[0]);
                assert.equal(proj.repositories[1], project.repositories[1]);
                assert.equal(res.header['location'], '/project/' + proj._id);
                done();
            });
        });
    });
});