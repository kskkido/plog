import db from './_db'
import User from './models/user'
import Tag from './models/tag'
import Article from './models/article'

// define associations
Article.belongsToMany(Tag, {through: 'ArticleTag', targetKey: 'tagName'})
Article.belongsTo(User)
Tag.belongsToMany(Article, {through: 'ArticleTag'})
User.hasMany(Article)

export default db
