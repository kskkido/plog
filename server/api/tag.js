const router = module.exports = require('express').Router(),
      db = require('../../db'),
      Article = db.model('article'),
      Tag = db.model('tag')

router.route('/')
.get((req, res, next) => {
  Tag.findAll()
    .then((tags) => res.json(tags))
    .catch(next)
})

router.route('/:tagName')
.get(({ params }, res, next) => {
  Article.findByTag(params.tagName)
    .then(res.json)
    .catch(next)
})
