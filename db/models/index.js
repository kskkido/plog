const app = require('../..')
    , name = app.env.DATABASE_NAME || app.name
    , url = app.env.DATABASE_URL || `postgres://localhost:5432/${name}`
    , Sequelize = require('Sequelize')

module.exports = new Sequelize(url, {
  define: {
    freezeTableName: true,
    timestamps: true,
    underscored: true
  },
  logging: false
})
