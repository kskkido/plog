const api = module.exports = require('express').Router()

api.use('/user', require('./user'))

api.use((req, res, next) => {
  const err = new Error('not found')
  err.status = 404
  next(err)
})
