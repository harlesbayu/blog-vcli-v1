process.env.DATA_TESTING = 'test'
const chai     = require('chai')
const expect   = chai.expect;
const chaiHTTP = require('chai-http')
const app      = require('../app')
const assert   = require('assert');

const mongoose = require('mongoose');
const User = require('../models/user')

chai.use(chaiHTTP)

describe('User', function() {

    it('/POST user signup', function(done) {
        chai.request(app)
            .post('/users/signup')
            .send({ 
                name: 'anggara', 
                picure: '',
                gender: 'male',
                phone: '08292929292',
                address : 'Bandung',
                email : 'anggara@mail.com',
                password: 'anggara'

            })
            .end(function (err, res) {
                expect(res.body.users).to.have.property('name')
                expect(res.body.users).to.have.property('gender')
                expect(res.body.users).to.have.property('phone')
                expect(res.body.users).to.have.property('address')
                expect(res.body.users).to.have.property('email')
                expect(res.body.users).to.have.property('password')
                expect(res.body.message).to.equal('register user success');
                done()
            });
    });

    afterEach(function() {
        User.remove({ email : { $ne : 'harles@mail.com'}})
        .then(function(result){})
    });

    it('/POST user signin', function(done) {
        chai.request(app)
            .post('/users/signin')
            .send({ 
                email : 'harles@mail.com',
                password: 'harles'
            })
            .end(function (err, res) {
                expect(res.body).to.have.property('token')
                done()
            });
    });

    it('/PUT user update', function(done) {
        chai.request(app)
            .put('/users/update')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjlmYmQ2MzdiZmJjNmJmM2MzZjhhZmQiLCJpYXQiOjE1MzcyMDM3MzB9.zh2NrNECMRYW4J2p1aJT3cxZamzQNLacq2oksXRm7PI')
            .send({ 
                name: 'harles bayu', 
                picure: '',
                gender: 'female',
                phone: '0812',
                address : 'Jakarta',

            })
            .end(function (err, res) {
                expect(res.body).to.have.property('user')
                expect(res.body.user).to.have.property('nModified').to.equal(1)
                expect(res.body.message).to.equal('update user success');
                done()
            });
    });

    afterEach(function() {
        User.remove({ email : { $ne : 'harles@mail.com'}})
        .then(function(result){})
    });

});

describe('Article', function(){

    it('/POST create article', function(done) {
        chai.request(app)
            .post('/articles/create')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjlmYmQ2MzdiZmJjNmJmM2MzZjhhZmQiLCJpYXQiOjE1MzcyMDk0NDl9.AYKpTIoX8cGx9YVbCGZHV7pjZXaV5U7dx2WtA7IFrv0')
            .send({ 
               title : 'Title Three',
               content  : 'Lorem ipsum dolor amet three',
            })
            .end(function (err, res) {
                expect(res.body.message).to.equal('create article success')
                done()
            });
    });

    it('/PUT update article', function(done) {
        chai.request(app)
            .put('/articles/update/5b9ff583fb0c4ae736a06b41')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjlmYmQ2MzdiZmJjNmJmM2MzZjhhZmQiLCJpYXQiOjE1MzcyMDk0NDl9.AYKpTIoX8cGx9YVbCGZHV7pjZXaV5U7dx2WtA7IFrv0')
            .send({ 
               title : 'Title One Update',
               content  : 'Lorem ipsum dolor amet Update',
            })
            .end(function (err, res) {
                expect(res.body.message).to.equal('update article success')
                done()
            });
    });


    it('/DELETE update article', function(done) {
        chai.request(app)
            .delete('/articles/remove/5b9ff583fb0c4ae736a06b41')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjlmYmQ2MzdiZmJjNmJmM2MzZjhhZmQiLCJpYXQiOjE1MzcyMDk0NDl9.AYKpTIoX8cGx9YVbCGZHV7pjZXaV5U7dx2WtA7IFrv0')
            .end(function (err, res) {
                expect(res.body.message).to.equal('delete article success')
                done()
            });
    });

})

describe('Comment', function(){


    it('/POST visitor signin', function(done) {
        chai.request(app)
            .post('/comments/signin')
            .send({ 
                email : 'anggara@mail.com',
                password: 'anggara'

            })
            .end(function (err, res) {
                expect(res.body).to.have.property('role').to.equal('visitor')
                expect(res.body).to.have.property('token')
                done()
            });
    });

    it('/POST visitor create comment', function(done) {
        chai.request(app)
            .post('/comments/create')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjlmZWEyN2Q4MDYyYmRkZWNhZmNkZmQiLCJpYXQiOjE1MzcyMDcxNTB9.7OaD2SiODnMYLD9Z9EYwfx2TCyD_U7nVbmczq5eEBM0')
            .send({ 
                status : 'article mantap',
                articleId : '5b9fca925eb088ccd5c39f20'
            })
            .end(function (err, res) {
                console.log(res.body)
                done()
            });
    });

    it('/PUT visitor update comment', function(done) {
        chai.request(app)
            .put('/comments/update/5b9fefab152210e243550a4f')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjlmZWEyN2Q4MDYyYmRkZWNhZmNkZmQiLCJpYXQiOjE1MzcyMDcxNTB9.7OaD2SiODnMYLD9Z9EYwfx2TCyD_U7nVbmczq5eEBM0')
            .send({ 
                status : 'article mantap update nih'
            })
            .end(function (err, res) {
                expect(res.body.message).to.equal('create comment success')
                done()
            });
    });

    it('/DELETE visitor delete comment', function(done) {
        chai.request(app)
            .delete('/comments/remove/5b9fefab152210e243550a4f')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjlmZWEyN2Q4MDYyYmRkZWNhZmNkZmQiLCJpYXQiOjE1MzcyMDcxNTB9.7OaD2SiODnMYLD9Z9EYwfx2TCyD_U7nVbmczq5eEBM0')
            .end(function (err, res) {
                expect(res.body.message).to.equal('delete comment success')
                done()
            });
    });


})

