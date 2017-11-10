import db from '../_db'
import Sequelize from 'sequelize'

const { INTEGER, STRING } = Sequelize

const schema = {
  tagName: {
    type: STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
    set(value) {
      this.setDataValue('tagName', value.toUpperCase())
    }
  },
  count: {
    type: INTEGER,
    defaultValue: 0
  }
}

const option = {
}

const classMethods = {
  findByTagName(tagName) {
    return this.findOne({
      where: { tagName }
    })
  }
}

const instanceMethods = {
  updateCount() {
    return this.getArticles()
      .then((articles) => {
        const count = articles.reduce(countArticle, 0)

        return this.update({ count })
      })
  }
}

export default (() => {
  const Tag = db.define('tag', schema, option)

  Object.assign(Tag, classMethods)
  Object.assign(Tag.prototype, instanceMethods)
  return Tag
})()

function countArticle (total, article) {
  return article.get('status') ? total + 1 : total
}
