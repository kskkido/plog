const router = module.exports = require('express').Router(),
      Article = require('../../db').model('article')

router.param('id', (req, res, next, id) => {
  Article.findById(id)
    .then(article => {
      if (typeof article === 'undefined') {
        return res.status(404)
      }
      req.targetArticle = article
      next()
    })
    .catch(next)
})

router.route('/')
.get((req, res, next) => {
  Article.findAll()
    .then(res.json)
    .catch(next)
})
.post((req, res, next) => {
  Article.create(req.body) // maybe have utility function to convert payload
    .then(() => res.sendStatus(201))
    .catch(next)
})

router.route('/:id')
.get((req, res, next) => {
  res.json(req.targetArticle)
})
.put((req, res, next) => {
  req.targetArticle.update(req.body)
    .then(article => res.status(201).json(article))
    .catch(next)
})
