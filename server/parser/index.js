const marked = require('marked'),
      Article = require('../../db').model('article')

// config
marked.setOptions(require('./config'));

// middleware that parses article text to html... should be used for post requests
const parseToHtml = (req, res, next) => {
  return marked(req.body, (err, content) =>
    err ?
    res.sendStatus(404) :
    (Object.assign(req.body, {html: content}), next())
  )
}

module.exports = parseToHtml
