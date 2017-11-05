if (module === require.main) {
  require('babel-register')({
    presets: ['env']
  })

  const db = require('../index.js').default
  const seed = require('./seed')

  db.sync({force: true})
    .then(() => seed.loggedSeedArticle(10))
    .finally(() => process.exit())
}

module.exports = require('./seed')

