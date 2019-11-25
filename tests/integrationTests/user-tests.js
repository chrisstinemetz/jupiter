const http = require('chai-http')
const chai = require('chai')
const app = require('../../app')
const expect = chai.expect
const mongoose = require('mongoose')

chai.use(http)

describe('Test user API end point', () => {
  const valid_user = {
    name: "Test Person", 
    email: "testEmail@gmail.com", 
    password: "password", 
    isAdmin: false
  }

  it('Should fail to create new user due to missing email', (done) => {
    const user_empty_email = {
        name: "Garry Cabrera", 
        email: "", 
        password: "password", 
        isAdmin: false
    }
    chai.request(app).post('/v1/users')
    .send(user_empty_email)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        }).catch(done)
  })

  it('Should return 200 and token after valid user creation', (done) => {
      chai.request(app).post('/v1/users')
      .send(valid_user)
        .then((res) => {
          //assertions
          expect(res).to.have.status(201);
          expect(res.body.token).to.exist;
          //assign the created token to be reused for other tests
          valid_user.token = res.body.token;
          done();
        }).catch(done);
  })

  it('Return 401 for passing invalid password of test user', (done) =>{
    const user_invalid_password = {
      name: "Test Person", 
      email: "testEmail@gmail.com", 
      password: "invalidPassword", 
      isAdmin: false
    }

    chai.request(app).post('/v1/users/login')
    .send(user_invalid_password)
      .then((res) => {
        expect(res).to.have.status(401);
        done();
      }).catch(done);
  })

  it('Login the new registered test user and return 200', (done) => {
    chai.request(app).post('/v1/users/login')
    .send(valid_user)
    .then((res) => {
      expect(res).to.have.status(200);
      done();
    }).catch(done);
  })

    //After all tests are finished open db connection, drop db and close connection
  after(function(done){
    // mongoose connect options
    var options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    mongoose.connect('mongodb://localhost:27017',options);
    const db = mongoose.connection;
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
})