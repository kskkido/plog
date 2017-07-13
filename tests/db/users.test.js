const request = require('supertest')
    , { expect } = require('chai')
    , db = require('../../db/models')
    , User = db.model('users')
    , app = require('../../server')
    , name = 'test1'
    , email = 'test1@test.com'
    , password = 'test1password'


describe('User api', () => {
  before('Waiting to sync database', () => db.syncAndLaunch(() => console.log('complete sync')))
  after('Clearing database', () => db.sync({force: true}))

  let dummyUser

  before('Add dummy users to database', () => {
    return User.create({name, email, password})
      .then(user => {
        dummyUser = user
      })
      .catch(console.error)
  })

  describe('Authenticate: string -> bool', () => {
    it('Should resolve to true if the password matches', () => {
     return dummyUser.authenticate(password)
      .then(res => {
        expect(res).to.equal(true)
      })
      .catch(console.error)
    })

    it('Should resolve to false if the password does not', () => {
      return dummyUser.authenticate('incorrectPassword')
      .then(res => {
        expect(res).to.equal(false)
      })
      .catch(console.error)
    })
  })
})
