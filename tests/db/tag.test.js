import chai from 'chai'
import db from '../../server/db'

const { expect } = chai
const Article = db.model('article')
const Tag = db.model('tag')

let dummyArticle,
    title = 'testArticle',
    content = 'testContent',
    dummyTag,
    tagName = 'testTag'

describe('Tag model', () => {
  before('Waiting to sync database', () => db.syncAndLaunch(() => console.log('complete sync')))
  after('Clearing database', () => db.sync({force: true}))

  before('Add dummy tag and article to database', () => {
    const createTag = Tag.create({tagName}),
          createArticle = Article.create({title, content})

    return Promise.all([createTag, createArticle])
      .then(([tag, article]) => {
        dummyTag = tag
        dummyArticle = article
      })
      .catch(console.error)
  })

  it('set association with an article', () =>
    dummyArticle.setTags(dummyTag)
      .then(() => dummyArticle.getTags())
      .then(tags => {
        expect(tags.length).to.equal(1)
        expect(tags[0].tagName).to.equal(tagName)
      })
      .catch(console.error)
  )
})
