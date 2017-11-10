import db from '../_db'
import Sequelize from 'sequelize'

const schema = {
}

const option = {
  hooks: {
    afterBulkCreate(instances, options) {
      return Promise.all(instances.map(
        (instance) => instance.updateTag()
      ))
    }
  }
}

const classMethods = {
}

const instanceMethods = {
  updateTag() {
    const tagName = this.get('tag_tagName')

    return db.model('tag').findByTagName(tagName)
      .then((tag) => tag.updateCount())
  },
  updateArticle() {
    const articleId = this.get('article_id')

    return db.model('article').findById(articleId)
  }
}

export default (() => {
  const ArticleTag = db.define('articleTag', schema, option)

  Object.assign(ArticleTag, classMethods)
  Object.assign(ArticleTag.prototype, instanceMethods)
  return ArticleTag
})()
