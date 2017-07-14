/* eslint-disable camelcase */
const db = require('../_db')
    , { STRING, VIRTUAL } = require('sequelize')
    , bcrypt = require('bcryptjs')

function setEmailAndPassword (user) {
  user.email = user.email && user.email.toLowerCase();
  if (!user.password) return Promise.resolve(user);
  return bcrypt.hash(user.get('password'), 10)
    .then(hash => user.set('password_digest', hash))
    .catch(err => console.error(err));
}

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

const User = module.exports = db.define('users', schema, options)
// define instance methods
User.prototype.authenticate = function(plaintext) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plaintext, this.password_digest,
    (err, result) => {
      err ? reject(err) : resolve(result)})
  })
}
