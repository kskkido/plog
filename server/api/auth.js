const router = module.exports = require('express').Router()
    , User = require('../../db/models').model('users')
    , passport = require('passport')

// define Google Auth

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
router.post('/login/local', passport.authenticate('local', {successRedirect: '/'}))

router.get('/logout', (req, res, next) => {
  req.logout()
  res.sendStatus(200)
})

// who am i
router.get('/me', (req, res) => res.json(req.user))
