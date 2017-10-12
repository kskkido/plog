const Tag = require('../db').model('tag')

const createTag = (req, res, next) => {
  const { tagList } = req.body

  tagList && tagList.length > 0 ?
    Promise.all(tagList.map((tagName) =>
      Tag.findOrCreate({where: {tagName}})
      .spread((tag) => tag)
    ))
      .then((tags) => {
        req.body.tagModels = tags

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
