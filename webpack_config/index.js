const clientConfig = require('./client'),
      serverConfig = require('./server.js'),
      environmentConfig = require('./environment')

module.exports = [clientConfig, serverConfig].map(environmentConfig)
