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
  Article.findByTag(params.tagName)
    .then(res.json)
    .catch(next)
})

export default router
