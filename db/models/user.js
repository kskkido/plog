/* eslint-disable camelcase */
const db = require('../_db')
    , { STRING, VIRTUAL } = require('sequelize')
    , bcrypt = require('bcryptjs')

const schema = {
  name: STRING,
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  google_id: STRING,
  password_digest: STRING,
  password: VIRTUAL
}

const options = {
  indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword
  },
}

const instanceMethods = {
  authenticate (plaintext) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plaintext, this.password_digest,
        (err, result) => err ? reject(err) : resolve(result))
    })
  }
}

module.exports = (() => {
  const User = db.define('user', schema, options)

  Object.assign(User.prototype, instanceMethods)
  return User
})()

function setEmailAndPassword (user) {
  user.email = user.email && user.email.toLowerCase();
  if (!user.password) return Promise.resolve(user);
  return bcrypt.hash(user.get('password'), 10)
    .then(hash => user.set('password_digest', hash))
    .catch(err => console.error(err));
}
