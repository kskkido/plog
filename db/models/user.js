const db = require('../')
    , { STRING } = require('sequelize')

const schema = {
  userName: {
    type: STRING,
    defaultValue: 'John_Doe'
  },
  email: {
    type: STRING,
    validate: {
      isEmail: true
    }
  }
}

const options = {
  getterMethods: {
    emailName() {
      return {userName: this.userName, email: this.email}
    }
  },
  setterMethods: {
    email(newEmail) {
      this.setDataValue('email', newEmail)
    }
  }
}

module.exports = db.define('users', schema, options)
