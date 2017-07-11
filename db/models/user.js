const db = require('../')
    , { STRING, VIRTUAL } = require('sequelize')
    , bcrypt = require('bcryptjs')

const schema = {
  userName: {
    type: STRING,
    defaultValue: 'John_Doe'
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  passwordDigest: STRING,
  password: VIRTUAL
}

const options = {
  indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword
  },

  getterMethods: {
    emailName() {
      return {userName: this.userName, email: this.email}
    }
  },
  setterMethods: {
    email(newEmail) {
      this.setDataValue('email', newEmail)
    }
  },
  instanceMethods: {},
  classMethods: {}
}

module.exports = db.define('users', schema, options)


// utils
function setEmailAndPassword (user) {
  user.email = user.email && user.email.toLowerCase();
  if (!user.password) return Promise.resolve(user); // google OAuth means user may not have a password
  return bcrypt.hash(user.get('password'), 10)
    .then(hash => user.set('passwordDigest', hash))
    .catch(err => console.error(err));
}
