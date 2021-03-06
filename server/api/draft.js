import express from 'express'

const router = express.Router()

router.route('/')
.get((req, res, next) => {
  req.session.draft &&
    res.json(req.session.draft) ||
    next()
})
.post((req, res, next) => {
  const { type, payload } = req.body

  if (type === undefined || payload === undefined) {
    return next()
  }

  req.session.draft[type] = payload
  res.sendStatus(204)
})

export default router

