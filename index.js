// define constants such as env
// module.exports getters that check for environment variables
// some how make symlink work like bones
const pkg = require('./package.json')
    , env = require('process').env


module.exports = {
  get name() { return pkg.name },
  get baseUrl() {
    return env.BASE_URL || `http://localhost:${module.exports.port}`
  },
  get port() {
    return env.PORT || 1337
  },
  package: pkg,
  env,
}
