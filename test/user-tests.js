const http = require('chai-http')
const chai = require('chai')
const app = require('../app')
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
        chai.request(app).post('/users')
        .send(valid_user)
          .then((res) => {
            console.log(res.body);
            //assertions
            expect(res).to.have.status(200);
            expect(res.body.token).to.exist;
            expect(res.body.errors.length).to.be.equal(0);
            done();
          }).catch(err => {
            console.log(err.message);
          })
    })

    it('Should fail create new user due to missing email', (done) => {
        const invalid_user = {
            name: "Garry Cabrera", 
            email: "", 
            password: "password", 
            isAdmin: false
        }
        chai.request(app).post('/users')
        .send(invalid_user)
            .then((res) => {
                // console.log(res.body)
                expect(res.body.tok.to.exist)
            })
    })
})