import db from '../'

const Article = db.model('article')
const Tag = db.model('tag')

/* ====== SEED DATA ====== */
const contentState = {
  entityMap: {},
  blocks: [{
    key: '18ql9',
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut aliquam elit. Aliquam pulvinar metus sapien, quis fermentum orci euismod eget. Donec dignissim massa a ex dictum, eget blandit ipsum pharetra. Maecenas nec efficitur ligula, a convallis ex. Suspendisse ullamcorper luctus purus, ut pellentesque dolor imperdiet in. Phasellus ac ligula eu tellus venenatis sollicitudin vel eget ligula. Ut vitae justo nulla. Maecenas vestibulum augue ex, et imperdiet diam pellentesque eu. Mauris elementum erat arcu, quis faucibus ex ullamcorper non. Pellentesque in tortor semper, mollis libero vitae, iaculis est. Phasellus sit amet luctus est. Vestibulum fermentum fringilla vulputate. Etiam a pharetra lacus.

    Nullam eu tortor vel orci sollicitudin accumsan vel at lorem. Vivamus gravida, erat eleifend posuere malesuada, ipsum nisi vulputate nulla, eget dictum ipsum eros vitae lacus. Maecenas arcu lectus, suscipit at ornare a, consectetur nec dui. Mauris dictum quam id augue volutpat volutpat. Mauris suscipit lobortis lectus eget facilisis. Integer commodo nunc sit amet diam vehicula ullamcorper. Pellentesque tempus est sit amet felis molestie, vitae convallis sapien venenatis. In et lectus in dolor convallis pellentesque. Sed odio elit, pretium et semper eget, porttitor nec erat. Vivamus convallis, mauris at dapibus lobortis, sapien libero viverra justo, eu pretium sapien ex sed arcu.

    Morbi euismod nisi eget neque dignissim, in molestie lorem consectetur. Nulla facilisi. Vivamus a augue mi. Ut finibus efficitur tortor sed venenatis. Sed sit amet facilisis ante. Phasellus rhoncus odio vitae elit cursus, non condimentum velit vulputate. Pellentesque consectetur cursus metus nec tincidunt. Aliquam aliquam feugiat elit quis volutpat. Aliquam erat volutpat. Maecenas pellentesque enim libero, et iaculis est mattis at. In id elementum dolor.

    Nunc felis leo, malesuada at porttitor a, tristique a magna. Nulla volutpat purus justo, quis tempor leo luctus quis. Cras maximus, ante quis pharetra ullamcorper, velit augue malesuada nibh, ac varius dolor risus at ligula. In vehicula est augue, non gravida leo vestibulum non. Fusce suscipit convallis leo, vitae rhoncus dui elementum vitae. Quisque tristique leo in elit imperdiet dictum. Vestibulum vel erat vehicula, feugiat nisi vitae, semper ante. Vestibulum sed varius risus, ac aliquet magna.

    Praesent sagittis elit rutrum felis suscipit malesuada. Morbi consectetur, urna a ornare efficitur, quam lacus tempus lorem, sit amet iaculis metus dolor ac lacus. Sed lectus risus, tempus vel facilisis in, rhoncus nec neque. Praesent rutrum cursus tellus, sed vehicula mauris sagittis vel. Sed congue et mi malesuada convallis. Nulla sit amet risus nec velit imperdiet lacinia. Duis molestie eu justo porta eleifend. Curabitur rhoncus risus ac congue aliquet. Suspendisse at rhoncus lacus. Morbi tincidunt efficitur erat, sed laoreet nibh bibendum sed.`,
    type: 'unstyled',
    depth: 0,
    inlineStyleRanges: [],
    entityRanges: [],
  }],
};

const POOL_DATA = {
  tags: ['NODE', 'DESIGN', 'REACT', 'FRONT END'],
  title: 'test article',
  content: JSON.stringify(contentState),
  status: true
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
    {content, title, tags, status} = POOL_DATA
    let len = tags.length

    for (; n; n -= 1) {
      tree.push({
        tags: getRandomTags(getRandomIdx(len)),
        title: title + n,
        content,
        status
      })
    }

    return tree
  }

  const createSeed = ({title, content, tags, status}) => {

    const createArticle = Article.create({title, content, status}),
          createTags = tags.map(tagName => Tag.findOrCreate({where: {tagName}})
          .then(([tag]) => tag))

    return Promise.all([createArticle, ...createTags])
      .then(([article, ..._tags]) =>
        article.setTags(_tags)
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
