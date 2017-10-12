const { stateToHTML } = require('draft-js-export-html')
// config

// middleware that parses article text to html... should be used for post requests
const parseToHtml = ({ body }, res, next) => {
  console.log(body, 'touch my body')
  const html = stateToHTML(body.article)
  return html ?
    (Object.assign(body, {html}), next()) :
    res.sendStatus(404)
}

module.exports = parseToHtml
