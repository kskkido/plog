const db = require('./_db')
    , User = require('./models/user')
    , Tag = require('./models/tag')
    , Article = require('./models/article')

// define associations
Article.belongsToMany(Tag, {through: 'ArticleTag', targetKey: 'tagName'})
Article.belongsTo(User)
Tag.belongsToMany(Article, {through: 'ArticleTag'})
User.hasMany(Article)

module.exports = db
