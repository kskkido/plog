import db from './_db'
import User from './models/user'
import Tag from './models/tag'
import Article from './models/article'
import ArticleTag from './models/articleTag'

// define associations
Article.belongsToMany(Tag, {through: ArticleTag, targetKey: 'tagName'})
Article.belongsTo(User)
Tag.belongsToMany(Article, {through: ArticleTag})
User.hasMany(Article)

// define other
Article.addScope('defaultScope', {
  include: [{
    model: Tag
  }],
  order: [['created_at', 'DESC']]
}, { override: true })
// Tag.addScope('defaultScope', {
//   include: [{
//     model: Article,
//     attributes: ['id']
//   }]
// }, { override: true })

export default db
