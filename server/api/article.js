import express from 'express'
import db from '../db'
import { createTag } from '../util'

const router = express.Router()
const Article = db.model('article')

router.param('id', (req, res, next, id) =>
  Article.findById(id)
    .then(article => {
      if (article === null) { return res.sendStatus(404) }

      req.targetArticle = article
      next()
      return null
    })
    .catch(next)
)

router.route('/')
.get((req, res, next) => {
  Article.findAll({attributes: {exclude: ['content']}})
    .then((articles) => res.json(articles))
    .catch(next)
})
.post(createTag, ({ body }, res, next) => {
  Article.create({title: body.title, content: body.content}) // maybe have utility function to convert payload
    .then((article) => {
      body.tagModels && article.setTags(body.tagModels)
      res.status(201).json({id: article.id})
    })
    .catch(next)
})

router.route('/recent')
.get(({ query }, res, next) => {
  Article.findRecent(query.limit, query.condition)
    .then(articles => res.json(articles))
    .catch(next)
})

router.route('/private')
.get((req, res, next) => {
  Article.findPrivate()
    .then(articles => res.json(articles))
    .catch(next)
})

router.route('/public')
.get((req, res, next) => {
  Article.findPublic()
    .then(articles => res.json(articles))
    .catch(next)
})

router.route('/:id')
.get((req, res, next) => {
  res.status(200).json(req.targetArticle)
})
.put(createTag, ({ body, targetArticle }, res, next) => {
  targetArticle.update(body)
    .then(article => {
      body.tagModels && article.setTags(body.tagModels)
      return res.status(201).json(article)
    })
    .catch(next)
})

export default router
