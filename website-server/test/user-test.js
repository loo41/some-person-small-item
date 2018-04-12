const superTest = require('supertest')
const should = require('should')
const server = require('../bin/www')
const agent = superTest.agent(server)
let userToken = ``

describe(`test user`, () => {

  it(`user login API`, async() => {
    const result = await agent.post(`/website/user/login`)
         .send({username: `田陈`, password: `123456`})
    const {code, token} = result.body
    should.exist(code)
    code.should.equal(20000)
    should.exist(token)
    userToken = token

  })

  it(`user info API`, async() => {
    const result = await agent.get(`/website/user/info`)
                              .set(`token`, userToken)
    const {code, data} = result.body
    should.exist(code)
    should.exist(data)
    code.should.equal(20000)
  })

})