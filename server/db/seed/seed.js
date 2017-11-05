import db from '../'

const Article = db.model('article')
const Tag = db.model('tag')

/* ====== SEED DATA ====== */
const POOL_DATA = {
  tags: ['node', 'design', 'react', 'front-end'],
  title: 'test article',
  content: '<p>Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n\n Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</P>'
}

/* ====== UTIL ====== */
const getRandomIdx = (n) =>
  Math.floor(Math.random() * Math.max(n, 0))

const seedLogger = (seedFn) =>
  (...args) => {
    console.log('WRITING', args, 'DATA TO DATABASE')
    return seedFn(...args)
      .then(() => console.log('COMPLETE SEEDING'))
      .catch(() => console.log('FAILED SEEDING'))
}

/* ====== SEED FN ====== */
const seedArticle = (() => {
  const getRandomTags = (n) => {
    const { tags } = POOL_DATA,
    res = []
    let randomIdx,
      prev

    for (; n ; n -= 1) {
      randomIdx = getRandomIdx(n)
      prev = tags[n]

      tags[n] = tags[randomIdx]
      tags[randomIdx] = prev

      res.push(tags[n])
    }

    return res
  }

  const createPool = (n) => {
    const tree = [],
    {content, title, tags} = POOL_DATA
    let len = tags.length

    for (; n; n -= 1) {
      tree.push({
        tags: getRandomTags(getRandomIdx(len)),
        title: title + n,
        content
      })
    }

    return tree
  }

  const createSeed = ({title, content, tags}) => {

    const createArticle = Article.create({title, content}),
          createTags = tags.map(tagName => Tag.findOrCreate({where: {tagName}})
          .then(([tag]) => tag))

    return Promise.all([createArticle, ...createTags])
      .then(([article, ..._tags]) =>
        article.setTags( _tags)
        .then(() => (console.log('ARTICLE', article), article))
        .catch(err => console.log('failed to set tags', err))
      )
      .catch(err => console.log('failed to create seed', err))
  }

  const createSeedList = (n) => {
    const pool = createPool(Math.max(n, 1))
    return Promise.all(pool.map(createSeed))
  }

  return createSeedList
})()

export const loggedSeedArticle = seedLogger(seedArticle)

/* ====== CALL SEED ===== */
if (module === require.main) {
  db.sync({force: true})
    .then(() => loggedSeedArticle(10))
    .finally(() => process.exit())
}
