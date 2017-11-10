import db from '../_db'
import Sequelize from 'sequelize'

const { DATE, BOOLEAN, INTEGER, NOW, STRING, TEXT, VIRTUAL } = Sequelize

const schema = {
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    set (_title) {
      this.setDataValue('title', setTitle(_title))
    }
  },
  date: {
    type: DATE,
    defaultValue: NOW
  },
  content: {
    type: TEXT,
    allowNull: false,
    set(value) {
      this.setDataValue('content', value)
    },
  },
  html: {
    type: TEXT,
  },
  preview: {
    type: TEXT,
  },
  status: {
    type: BOOLEAN,
    defaultValue: false,
  },
  image: STRING,
  version: {
    type: INTEGER,
    defaultValue: 0,
  }
}

const options = {
  hooks: {
    beforeUpdate: (article) => {
      article.version += 1
    }
  }
}

const classMethods = {
  findByTitle (title) {
    return this.findOne({ // this refers to class
      where: {title: setTitle(title)}
    })
  },
  findByTag (tagName) {
    return this.findAll({
      include: [{
        model: db.model('tag'),
        where: {tagName}
      }]
    })
  },
  findRecent (limit = 50, condition = {}) {
    return this.findAll({
      where: condition
    })
  },
  findPublic () {
    return this.findAll({
      where: { status: true }
    })
  },
  findPrivate () {
    return this.findAll({
      where: { status: false }
    })
  },
  createWithTag (scheme, tagModels = []) {
    return this.create(scheme)
      .then((article) => {
        const p = tagModels.length > 0 && article.setTags(tagModels)

        return Promise.resolve(p)
          .then(() => this.findById(article.id))
      })
  }
}

const instanceMethods = {
  updateWithTag (scheme, tagModels = []) {
    return this.update(scheme)
      .then((article) => {
        const p = tagModels.length > 0 && article.setTags(tagModels)

        return Promise.resolve(p)
          .then(() => article)
      })
  }
}

export default (() => {
  const Article = db.define('article', schema, options)

  Object.assign(Article, classMethods)
  Object.assign(Article.prototype, instanceMethods)
  return Article
})()

const matchInitial = /\b([a-z])/g
function setTitle (title) {
  return title.replace(matchInitial, (all, letter) => letter.toUpperCase())
}
