const { env, baseUrl } = require('../..')

module.exports = {
  google: {
    authorization: {
      consumerKey: env.GOOGLE_CLIENT_ID || 'blah',
      consumerSecret: env.GOOGLE_CLIENT_SECRET || 'blahblah',
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
