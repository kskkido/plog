import express from 'express'
import db from '../db'

const router = express.Router()
const Article = db.model('article')
const Tag = db.model('tag')

router.route('/')
.get((req, res, next) => {
  Tag.findAll({
    include: [{
      model: Article,
      attributes: ['id']
    }]
  })
    .then((tags) => res.json(tags))
    .catch(next)
})

router.route('/:tagName')
.get(({ params }, res, next) => {
  Tag.findOne({
    where: {
      tagName: params.tagName
    },
    include: [{
      model: Article,
      attributes: ['id']
    }]
  })
    .then((tag) => res.json(tag))
    .catch(next)
})

export default router
