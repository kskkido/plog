const app = require('../')
    , name = app.env.DATABASE_NAME || app.name
    , url = app.env.DATABASE_URL || `postgres://localhost:5432/${name}`
    , Sequelize = require('sequelize')
    , sync = app.env.NODE_ENV === 'development' ? { force: true } : {}

const db = module.exports = new Sequelize(url, {
  define: {
    freezeTableName: true,
    timestamps: true,
    underscored: true
  },
  logging: false
})

// syncs database and runs callback if successful, called in ../server
db.syncAndLaunch = (callback) => {
  const attemptSync = (reattempt = false) => {
    db.sync(sync)
    .then(callback)
    .catch((err) => {
      console.error('failed to sync database')
      if (!reattempt) {
        console.log('reattempting start up')
        return new Promise((res) => {
          require('child_process').exec(`createdb "${name}"`, res)
        })
        .then(() => attemptSync(true))
      } else {
        console.error('failed to reattempt sync', err)
      }
    })
  }
  return attemptSync()
}
