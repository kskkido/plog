import app from '../../'
import Sequelize from 'sequelize'

const { env, name } = app
const dbName = env.DATABASE_NAME || name
const url = env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const sync = env.NODE_ENV === 'DEVELOPMENT' ? {force: true} : {}
const db = new Sequelize(url, {
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
    db.sync({})
    .then(callback)
    .catch((err) => {
      console.error('failed to sync database')
      if (!reattempt) {
        console.log('reattempting start up')
        return new Promise((res) => {
          require('child_process').exec(`createdb "${dbName}"`, res)
        })
        .then(() => attemptSync(true))
      } else {
        console.error('failed to reattempt sync')
      }
    })
  }
  return attemptSync()
}

export default db
