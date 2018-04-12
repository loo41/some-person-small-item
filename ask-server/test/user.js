const superTest = require('supertest')
const should = require('should')
const server = require('../bin/www')
const agent = superTest.agent(server)

describe(`test login`, () => {
  it(`user login API success`, async() => {
    const result = await agent.post(`/ask_youngon/user/login`)
        .send({username: `田陈`, password: `123456`})
    const {code} = result.body
    should.exist(code)
    code.should.equal(20000)
  })
  it(`user login API fail`, async() => {
    const result = await agent.post(`/ask_youngon/user/login`)
        .send({username: `田陈永`, password: `123456`})
    const {code} = result.body
    should.exist(code)
    code.should.equal(40004)
  })
})

describe(`test user`, () => {
  it(`user login API success`, async() => {
    const result = await agent.post(`/ask_youngon/user/addUser`)
        .send({
          username: `田陈永`, password: `123456`,
          discription: `test`, sex: '男', grade: 8
        })
    const {code} = result.body
    should.exist(code)
    code.should.equal(40006)
  })
})