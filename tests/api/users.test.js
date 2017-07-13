const request = require('supertest')
    , { expect } = require('chai')
    , db = require('../../db/models')
    , User = db.model('users')
    , app = require('../../server')

/* ====== DEFINE DUMMY DATA ====== */
const numberOfUsers = 3

const defineDummyUser = id => {
  return {
    uniqueId: id,
    name: `test${id}`,
    email: `test${id}@test.com`,
    password: `test${id}password`
  }
}

const createDummyUserList = num => {
  const dummyList = {}
  for (let id = 1; id <= num; id++) {
    dummyList[`test${id}`] = defineDummyUser(id)
  }
  return dummyList
}
/* ===== */

describe('User api', () => {
  before('Waiting to sync database', () => db.syncAndLaunch(() => console.log('complete sync')))
  after('Clearing database', () => db.sync({force: true}))

  before('Add dummy users to database', () => {
    const dummyList = createDummyUserList(numberOfUsers)
    return Promise.all(Object.keys(dummyList).map(id => User.create(dummyList[id])))
  })

  describe('/api/users', () => {
    it('GET: can get all users', () => {
      return request(app)
      .get('/api/users')
      .then(res => {
        expect(res.body.length).to.equal(numberOfUsers)
        expect(res.body[0].name).to.equal('test1')
      })
      .catch(console.error)
    })

    it('GET /:id: can get a specific user', () => {
      return request(app)
      .get('/api/users/2')
      .then(res => {
        expect(res.body.name).to.equal('test2')
      })
      .catch()
    })

    it('PUT: can modify a specific user', () => {
      const newName = 'notTest3'
      return request(app)
      .put('/api/users/3')
      .send({name: newName})
      .then(res => {
        expect(res.body.id).to.equal(3)
        expect(res.body.name).to.equal(newName)
      })
      .catch(console.error)
    })
  })
})
