const { join } = require('path')
		, bodyParser = require('body-parser')
		, express = require('express')
		, app = express()
		, db = require('../db/models')
		, session = require('express-session')
		, SequelizeStore = require('connect-session-sequelize')(session.Store)
		, dbStore = new SequelizeStore({db})
		, passport = require('passport')

// logging middleware
app.use(require('morgan')('dev'))

// body parsing middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// define user sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'insecure secret',
	store: dbStore,
  resave: false,
  saveUninitialized: false
}))

// define passport
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  db.User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

// redirect to api routes
app.use('/api', require('./api'))

app.use(express.static(join(__dirname, '../app/public')))

app.get('*', (req, res, next) => {
	res.sendFile(join(__dirname, '../app/public'))
})

// error handling middlware
app.use((err, req, res, next) => {
	console.error(err)
	res.status(err.status || 500).send(err.message || 'Internal server error')
})

if (module === require.main) {
	db.syncAndLaunch(
		(_) => {
			console.log('successfully synced database')
			const server = app.listen(
			require('../').port,
			() => {
				console.log('connected')
				const { address, port } = server.address()
				const host = address === '::' ? 'localhost' : address
				const urlSafeHost = host.includes(':') ? `[${host}]` : host
				console.log(`Listening on http://${urlSafeHost}:${port}`)
			})
		}
	)()
}
