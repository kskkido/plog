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
  hooks: {
    afterUpdate: (tag) => {
      console.log(tag.getArticles, 'lol')
    }
  }
}

const classMethods = {

}

const instanceMethods = {

}

export default (() => {
  const Tag = db.define('tag', schema, option)

  Object.assign(Tag, classMethods)
  Object.assign(Tag.prototype, instanceMethods)
  return Tag
})()
