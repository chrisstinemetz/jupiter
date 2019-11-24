const http = require('chai-http')
const chai = require('chai')
const app = require('../../app')
const expect = chai.expect
const mongoose = require('mongoose')

chai.use(http)

describe('Test user API end point', () => {
    const valid_user = {
        name: "Garry Cabrera", 
        email: "someEmail@gmail.com", 
        password: "password", 
        isAdmin: false
    }

    it('Should return 200 and token after valid user creation', (done) => {
        chai.request(app).post('/v1/users')
        .send(valid_user)
          .then((res) => {
            //assertions
            expect(res).to.have.status(201);
            expect(res.body.token).to.exist;
            // expect(res.body.errors.length).to.be.equal(0);
            done();
          }).catch(done);
    })

    // Different itteration of the above test, which also fails in the then() method. 
    // describe('POST /users', () => {
    //     it('should register a new user', (done) => {
    //         chai.request(app).post('/v1/users')
    //         .send({
    //             name: "Garry Cabrera",
    //             email: "gfunk@gmail.com",
    //             password: "someRidiculousPassword"
    //         })
    //         .then((err, res) => {
    //           should.not.exist(err);
    //           res.redirects.length.should.eql(0);
    //           res.status.should.eql(201);
    //           res.type.should.eql('application/json');
    //           res.body.should.include.keys('status', 'token');
    //           res.body.status.should.eql('success');
    //           done();
    //         });
    //       });
    // })

    // it('Should fail create new user due to missing email', (done) => {
    //     const invalid_user = {
    //         name: "Garry Cabrera", 
    //         email: "", 
    //         password: "password", 
    //         isAdmin: false
    //     }
    //     chai.request(app).post('/users')
    //     .send(invalid_user)
    //         .then((res) => {
    //             // console.log(res.body)
    //             expect(res.body.token.to.exist)
    //         })
    // })
})