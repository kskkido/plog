const { env } = require('../..')

module.exports = {
  google: {
    authorization: {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'login/google/callback',
    },
    request: {
      scope: 'email'
    },
    callback: {
      successRedirect: '/',
      failureRedirect: '/login'
    }
  }
}
