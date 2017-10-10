const db = require('../_db'),
      { INTEGER, STRING } = require('sequelize')


const schema = {
  tagName: {
    type: STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  count: {
    type: INTEGER,
    defaultValue: 0
  }
}

const option = {

}

const classMethods = {

}

const instanceMethods = {

}

module.exports = (() => {
  const Tag = db.define('tag', schema, option)

  Object.assign(Tag, classMethods)
  Object.assign(Tag.prototype, instanceMethods)
  return Tag
})()
