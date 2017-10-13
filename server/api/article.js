const router = module.exports = require('express').Router(),
      Article = require('../../db').model('article'),
      { createTag, toString } = require('../util')

router.param('title', (req, res, next, title) => {
  Article.findByTitle(toString(title))
    .then(article => {
      if (article === null) {
        return res.sendStatus(404)
      }

      req.targetArticle = article
      next()
    })
    .catch(next)
})

router.route('/')
.get((req, res, next) => {
  Article.findAll()
    .then((articles) => res.json(articles))
    .catch(next)
})
.post(createTag, ({ body }, res, next) => {
  Article.create({title: body.title, content: body.content}) // maybe have utility function to convert payload
    .then((article) => body.tagModels && article.setTags(body.tagModels))
    .then(() => res.sendStatus(201))
    .catch(next)
})

router.route('/recent')
.get(({ query }, res, next) => {
  Article.findRecent(query.limit, query.condition)
    .then(articles => res.json(articles))
    .catch(next)
})

router.route('/:title')
.get((req, res, next) => {
  res.status(200).json(req.targetArticle)
})
.put((req, res, next) => {
  res.targetArticle.update(req.body)
    .then(article => res.status(201).json(article))
    .catch(next)
})
