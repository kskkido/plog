const { join } = require('path')
		, bodyParser = require('body-parser')
		, express = require('express')
		, app = express()
		, db = require('../db/models')
		, session = require('express-session')
		, SequelizeStore = require('connect-session-sequelize')(session.Store)
		, dbStore = new SequelizeStore({db})
		, passport = require('passport')

app
// logging middleware
	.use(require('morgan')('dev'))

// body parsing middleware
	.use(bodyParser.urlencoded({extended: false}))
	.use(bodyParser.json())

// define user sessions
	.use(session({
		secret: process.env.SESSION_SECRET || 'insecure secret',
		store: dbStore,
		resave: false,
		saveUninitialized: false
	}))

// define passport
	.use(passport.initialize())
	.use(passport.session())

// redirect to api routes
	.use('/api', require('./api'))

	.use(express.static(join(__dirname, '../app/public')))

	.get('*', (req, res, next) => {
		res.sendFile(join(__dirname, '../app/public'))
	})

// error handling middlware
	.use((err, req, res, next) => {
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
	)
}
