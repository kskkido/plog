import { env } from '../..'

export default {
  google: {
    authorization: {
      clientID: env.GOOGLE_CLIENT_ID || 'blah',
      clientSecret: env.GOOGLE_CLIENT_SECRET || 'blahblah',
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
