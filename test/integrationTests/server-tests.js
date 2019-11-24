const http = require('chai-http')
const chai = require('chai')
const app = require('../app')
const expect = chai.expect
const mongoose = require('mongoose')

chai.use(http)

describe('Basic server tests', () => {
    it('responds to / and returns status 200', (done) => {
        chai.request(app).get('/')
        .then((res) => {
            expect(res).to.have.status(200)
            done()
        }).catch(err => {
            console.log(err.message)
        })
    })
})
