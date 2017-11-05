// define constants such as env
// module.exports getters that check for environment variables
// some how make symlink work like bones
const { join } = require('path')
const pkg = require('./package.json')
const process = require('process')
const { env } = process
const customEnv = join(env.HOME, `.${pkg.name}.env.json`)

try {
  Object.assign(env, require(customEnv))
} catch (err) {
  console.log('could not find custom env file in home directory')
}

module.exports = {
  get baseUrl() {
    return env.BASE_URL || `http://localhost:${module.exports.port}`
  },
  get name() { return pkg.name },
  get port() { return env.PORT || 1337 },
  get root () { return process.cwd() },
  package: pkg,
  env,
}
