const router = module.exports = require('express').Router()
    , User = require('../../db/models').model('users')

router.param('id', (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      if (!user) return res.sendStatus(404)
      req.targetUser = user
      next()
    })
    .catch(next)
})

router.route('/')
.get((req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
})
.post((req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) next(err)
        res.json(user)
      })
    })
    .catch(next)
})
