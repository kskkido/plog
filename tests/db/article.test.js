import chai from 'chai'
import db from '../../server/db'

const { expect } = chai
const Article = db.model('article')
const Tag = db.model('tag')

let dummyArticle,
    title = 'test article',
    content = 'test content asdfkjas;ldkfj ;laksdjfl;kasdfjl;kajf',
    status = true,
    dummyTag,
    tagName = 'testTag',
    tempDummy

describe('Article model', () => {
  before('Waiting to sync database', () => db.syncAndLaunch(() => console.log('complete sync')))
  after('Clearing database', () => db.sync({force: true}))

  before('Add dummy users to database', () => {
    const createArticle = Article.create({title, content, status}),
          createTag = Tag.create({tagName})

    return Promise.all([createArticle, createTag])
      .then(([article, tag]) => {
        dummyArticle = article
        dummyTag = tag

        return dummyArticle.setTags(dummyTag)
      })
      .catch(console.error)
  })

  describe('Options', () => {

    it('Should return truncated content on preview()', () =>
      expect(dummyArticle.preview).to.equal('test content asdfkjas;l...')
    )

    it('Should update article version on content update', () =>
      (tempDummy = dummyArticle, tempDummy).update({content: 'new test content'})
      .then(res =>
        expect(res.version).to.equal(1)
      )
      .catch(console.error)
    )
  })

  describe('class methods', () => {
    it('Should be able to find instance by title', () =>
      Article.findByTitle(title)
        .then(article =>
          expect(article).to.equal(dummyArticle)
        )
        .catch(console.error)
    )

    it('Should be able to find instance by associated tag', () =>
      Article.findByTag(tagName)
        .then(article =>
          expect(article[0]).to.equal(dummyArticle)
        )
        .catch(console.error)
    )
  })
})
