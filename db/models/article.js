const db = require('../_db'),
      { DATE, BOOLEAN, INTEGER, NOW, STRING, TEXT } = require('sequelize')

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
    type: TEXT('long'),
    allowNull: false
  },
  status: {
    type: BOOLEAN,
    defaultValue: true,
  },
  version: {
    type: INTEGER,
    defaultValue: 0,
  }
}

const options = {
  defaultScope: {
    include: [
        { model: db.model('tag') }
    ]
  },

  hooks: {
    afterUpdate: (article) => {
      article.version += 1
    }
  },
  getterMethods: {
    preview () {
      return this.content.slice(0, 23) + '...'
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
  }
}

const instanceMethods = {

}

module.exports = (() => {
  const Article = db.define('article', schema, options)

  Object.assign(Article, classMethods)
  Object.assign(Article.prototype, instanceMethods)
  return Article
})()

const matchTitle = /\b([a-z])/g
function setTitle (title) {
  return title.replace(matchTitle, (all, letter) => letter.toUpperCase())
}
