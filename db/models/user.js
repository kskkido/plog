const db = require('../')
    , { STRING, VIRTUAL } = require('sequelize')
    , bcrypt = require('bcryptjs')

console.log(VIRTUAL, 'WHAT THE FUCK')
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
  password: STRING
}

const options = {
  indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword
  },
  getterMethods: {},
  setterMethods: {},
  instanceMethods: {
    authenticate(text) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(text, this.password_digest, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
      )
    }
  },
  classMethods: {}
}

module.exports = db.define('users', schema, options)


// utils
function setEmailAndPassword (user) {
  user.email = user.email && user.email.toLowerCase();
  if (!user.password) return Promise.resolve(user); // google OAuth means user may not have a password
  return bcrypt.hash(user.get('password'), 10)
    .then(hash => user.set('password_digest', hash))
    .catch(err => console.error(err));
}
