const api = module.exports = require('express').Router()

// branch out to routers
api
  .use('/auth', require('./auth'))
  .use('/user', require('./user'))

// define error and send it to error handling middleware in server/index
  .use((req, res, next) => {
    const err = new Error('not found')
    err.status = 404
    next(err)
  })
