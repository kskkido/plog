const Tag = require('../db').model('tag')

const createTag = (req, res, next) => {
  const { tags } = req.body
  delete req.body.tags

  tags && tags.length > 0 ?
    Promise.all(tags.map((tagName) =>
      Tag.findOrCreate({where: {tagName}})
      .spread((tag) => tag)
    ))
      .then((_tags) => {
        req.body.tagModels = _tags
        next()
      })
      .catch(console.error) :
    next()
}

const toString = (param) => param.replace(/_/g, ' ')

module.exports = {
  createTag,
  toString
}
