const db = require('../_db'),
      { STRING } = require('sequelize')


const schema = {
  tagName: {
    type: STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
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
