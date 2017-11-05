import db from '../_db'
import Sequelize from 'sequelize'

const { INTEGER, STRING } = Sequelize

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
  // defaultScope: {
  //   include: [
  //     {
  //       model: db.model('article'),
  //       attributes: ['id']
  //     }
  //   ]
  // }
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
