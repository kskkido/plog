import db from './db'

const Tag = db.model('tag')

export const createTag = (req, res, next) => {
  let { tags } = req.body
  console.log(tags, 'dodododo')

  return tags && tags.length > 0 ?
    Promise.all(tags.map((tagName) =>
      Tag.findOrCreate({where: {tagName}})
      .spread((tag) => tag)
    ))
      .then((_tags) => {
        req.body.tags = _tags
        next()
      })
      .catch(console.error) :
    next()
}

export const toString = (param) => param.replace(/_/g, ' ')
