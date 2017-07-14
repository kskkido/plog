const router = module.exports = require('express').Router()
    , User = require('../../db').model('users')

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

router.route('/:id')
.get((req, res, next) => {
  res.json(req.targetUser)
})
.put((req, res, next) => {
  req.targetUser.update(req.body)
  .then(user => res.status(201).json(user))
  .catch(next)
})
