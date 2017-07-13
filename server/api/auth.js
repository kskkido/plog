const router = module.exports = require('express').Router()
    , User = require('../../db/models').model('users')
    , passport = require('passport')
    , configs = require('./authConfig')

// define oauth

// define serialize and deserialize users
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

// define passport strategies
passport.use(new (require('passport-google-oauth').Strategy)(
  configs.google.authorization, (token, refreshToken, profile, done) => {
    User.findOrCreate({
      where: {google_id: profile.id},
      defaults: {
        email: profile.emails[0].value,
        name: profile.displayName,
        google_id: profile.id
      }})
      .spread((user, _) => {
        if (!user) return done(null, false, {message: 'failed to create user'})
        done(null, user)
      })
      .catch(done)
  })
)

passport.use(new (require('passport-local').Strategy)(
  {usernameField: 'email'}, (email, password, done) => {
    User.findOne({where: {email}})
      .then(user => {
        if (!user) return done(null, false, {message: 'Incorrect login'})
        return user.authenticate(password)
          .then(success => {
            if (!success) return done(null, false, {message: 'Incorrect login'})
            done(null, user, {message: 'Login was successful'})
          })
      })
      .catch(done)
  }
))

// Standard login, logout with passport
router.post('/login/local', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}))

router.get('/login/:strategy', (req, res, next) => (
  passport.authenticate(req.params.strategy, configs[req.params.strategy].request)(req, res, next)
))

router.get('/login/:strategy/callback', (req, _, next) => (
  passport.authenticate(req.params.strategy, configs[req.params.strategy].callback)
))

router.get('/logout', (req, res, next) => {
  req.logout()
  res.sendStatus(200)
})

// who am i
router.get('/me', (req, res) => res.json(req.user))
