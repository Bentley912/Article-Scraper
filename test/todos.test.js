'use strict';

var app = require('../server'),
  chai = require('chai'),
  request = require('supertest');
var expect = chai.expect;

describe('Routing Tests', function() {
    describe('#GET /', function() { 
      it('should get homepage', function(done) { 
        request(app) .get('/')
          .end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            done(); 
        }); 
      });
    });

    describe('#GET / saved', function() { 
        it('should get all articles', function(done) { 
          request(app) .get('/saved')
            .end(function(err, res) { 
              expect(res.statusCode).to.equal(200); 
              expect(res.body).to.be.an('object'); 
              done(); 
            }); 
        });
    });
    describe('## Create article ', function() { 
        it('should create a task', function(done) { 
          request(app) .post('/saved') .send({"title":'Test Title'}) .end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            expect(res.body.title).to.equal('Test Title'); 
            task = res.body; 
            done(); 
          }); 
        }); 
      });
});

