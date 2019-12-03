const http = require('chai-http')
const chai = require('chai')
const app = require('../app')
const expect = chai.expect
const mongoose = require('mongoose')
const endpoint = '/v1/users'

chai.use(http)

describe('Users API end point tests', () => {
  describe('Test creating, updating, login in, login out and deleting a user', () => {
    const valid_user = {
      name: "Test Person",
      email: "testEmail@gmail.com",
      password: "Password",
      isAdmin: false,
    }

    it('Create new user and return 201', (done) => {
      chai.request(app)
        .post(endpoint)
        .send(valid_user)
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res.body.token).to.exist;
          done();
        }).catch(done);
    })

    it('Login new registered test user and return 200', (done) => {
      chai.request(app).post(endpoint + '/login')
        .send(valid_user)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.token).to.exist;
          done();
        }).catch(done);
    })

    it('Logout user from session', (done) => {
      chai.request(app).post('/users/me/logout')
        .send(valid_user)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.token).to.exist;
          done();
        }).catch(done);
    })

    /*
    TODO: Tests that will need to add
    Updating profile, "deleting" active user, "deleting" inactive user,
    "deleting" non existing user, login user who's file was "deleted"
    Note: We should NEVER delete a user profile but rather mark it as inactive. This way we maintain
    the history. 
    */
  })

  describe('Credential Validation tests', () => {
    it('Should return 400 to create new user due to missing name', (done) => {
      const user_empty_name = {
        name: "",
        email: "testEmail@gmail.com",
        password: "Password",
        isAdmin: false
      }
      chai.request(app).post(endpoint)
        .send(user_empty_name)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        }).catch(done)
    })

    it('Should return 400 to create new user due to missing password', (done) => {
      const user_empty_password = {
        name: "Test User",
        email: "testEmail@gmail.com",
        password: "",
        isAdmin: false
      }
      chai.request(app).post(endpoint)
        .send(user_empty_password)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        }).catch(done)
    })

    it('Should return 400 to create new user due to missing email', (done) => {
      const user_empty_email = {
        name: "Test User",
        email: "",
        password: "password",
        isAdmin: false
      }
      chai.request(app).post(endpoint)
        .send(user_empty_email)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        }).catch(done)
    })

    it('Return 400 for passing invalid password of created test user', (done) => {
      const user_invalid_password = {
        name: "Test Person",
        email: "testEmail@gmail.com",
        password: "invalidPassword",
        isAdmin: false
      }
      chai.request(app)
        .post(endpoint + '/login')
        .send(user_invalid_password)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        }).catch(done);
    })
  })

  //After all tests are finished open db connection, drop table and close connection
  after(function (done) {
    // mongoose connect options
    var options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    mongoose.connect(process.env.MONGODB_URL, options);
    const db = mongoose.connection;
    mongoose.connection.db.dropDatabase(function () {
      mongoose.connection.close(done);
    });
  });
})

