const router = module.exports = require('express').Router()

router.param('id', (req, res, next, id) => {
  req.userId = id
  next()
})

router.route('/')
.get((req, res, next) => {
  res.json({name: 'boiledEggs'})
})
