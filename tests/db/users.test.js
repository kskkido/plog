import request from 'supertest'
import chai from 'chai'
import db from '../../server/db'

const { expect } = chai
const User = db.model('user')
const name = 'test1'
const email = 'test1@test.com'
const password = 'test1password'

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
