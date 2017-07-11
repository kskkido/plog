// define constants such as env
// module.exports getters that check for environment variables
// some how make symlink work like bones
const { join } = require('path')
    , pkg = require('./package.json')
    , env = require('process').env
    , customEnv = join(env.HOME, `.${pkg.name}.env.json`)

try {
  Object.assign(env, require(customEnv))
} catch (err) {
  console.log('could not find custom env file in home directory')
}

module.exports = {
  get name() { return pkg.name },
  get port() {
    return env.PORT || 1337
  },
  get baseUrl() {
    return env.BASE_URL || `http://localhost:${module.exports.port}`
  },
  package: pkg,
  env,
}
