import express from 'express'
import auth from './auth'
import article from './article'
import draft from './draft'
import tag from './tag'
import user from './user'

export default express.Router()
  .use('/article', article)
  .use('/auth', auth)
  .use('/draft', draft)
  .use('/tag', tag)
  .use('/user', user)
