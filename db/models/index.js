const db = require('../')
    , Users = require('./user')(db)

// define associations
console.log(Users, 'YO')
module.exports = db
