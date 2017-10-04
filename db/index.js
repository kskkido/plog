const db = require('./_db')
    , Article = require('./models/article')
    , Tag = require('./models/tag')
    , User = require('./models/user')

// define associations
Article.belongsToMany(Tag, {through: 'ArticleTag', targetKey: 'tagName'})
Tag.belongsToMany(Article, {through: 'ArticleTag'})
User.hasMany(Article, {as: 'author'})

module.exports = db
