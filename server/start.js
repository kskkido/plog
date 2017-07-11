const { join } = require('path')
		, bodyParser = require('body-parser')
		, express = require('express')
		, app = express()
		, db = require('../db')
		, session = require('express-session')
		, SequelizeStore =  require('connect-session-sequelize')(session.Store)
		, dbStore = new SequelizeStore({db})
		, passport = require('passport')

app.use(require('morgan')('dev'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

dbStore.sync()

app.use(session({
  secret: process.env.SESSION_SECRET || 'tongiscool',
	store: dbStore,
  resave: false,
  saveUninitialized: false
}))

// comeback to serialize and deserialize
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(join(__dirname, '../public')))

app.use('/api', require('./api'))

app.get('*', (req, res, next) => {
	res.sendFile(join(__dirname, '../public'))
})

app.use((err, req, res, next) => {
	console.error(err)
	res.status(err.status || 500).send(err.message || 'Internal server error')
})

if (module === require.main) {
	const setUp = (reattempt = false) => {
		db.sync({force: true})
		.then(() => {
			console.log('synced database')
				const server = app.listen(
				require('../').port,
				() => {
					console.log('connected')
					const { address, port } = server.address()
					console.log(server.address(), 'SERVr ADDReSS')
					const host = address === '::' ? 'localhost' : address
					const urlSafeHost = host.includes(':') ? `[${host}]` : host
					console.log(`Listening on http://${urlSafeHost}:${port}`)
				}
			)
		})
		.catch(err => {
			console.error('failed to sync', err)
			if (!reattempt) {
				console.log('reattempting start up')
				return new Promise((res, _) => {
					require('child_process').exec(`createdb "${require('../').name}"`, res)
				})
				.then(() => setUp(true))
			} else {
				console.error('failed to reattempt sync')
			}
		})
	}
	setUp()
}
