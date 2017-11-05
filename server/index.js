import path from 'path'
import bodyParser from 'body-parser'
import express from 'express'
import session from 'express-session'
import sessionSequelize from 'connect-session-sequelize'
import passport from 'passport'
import db from './db'
import api from './api'
import { root } from '../'

const app = express()
const SequelizeStore = sessionSequelize(session.Store)
const dbStore = new SequelizeStore({db})

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

// session cookie
	.use((req, res, next) => {
		req.session.draft = {content: '', status: false, title: '', tags: []}

		next()
	})

// redirect to api routes
	.use(express.static(path.join(root, 'app/public')))
	.use('/api', api)

	.get('*', (req, res, next) => {
		res.sendFile(path.join(root, 'app/public/index.html'))
	})

	.use((err, req, res, next) => {
		console.error(err)
		res.status(err.status || 500).send(err.message || 'Internal server error')
	})

if (module === require.main) {
	db.syncAndLaunch(
		() => {
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

export default app
