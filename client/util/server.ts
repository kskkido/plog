import axios from 'axios'
import { convertFromRaw } from 'draft-js'

const convertPayload = (article: object) => {
  const { content } = article

  article.content = convertFromRaw(JSON.parse(content))]
  article.tags = article.tags || []
  return article
}

const convertPromise = (fnPromise: Function) => (...args: any[]) =>
  fnPromise(...args)
    .then((res: any) => {
      const { data } = res

      return Object.assign(res, {
        data: Array.isArray(data) ?
          data.map(convertPayload) :
          convertPayload(data)
      })
  })

export const fetchArticles = convertPromise(() => axios.get(`/api/article`))

export const fetchTags = () => axios.get('/api/tag')

export const fetchTag = (tagName: String) => axios.get(`/api/tag/${tagName}`)

export const fetchArticleId = convertPromise((id: number | string) => axios.get(`/api/article/${id}`))

export const fetchArticleTitle = (title: string ) => axios.get(`/api/article/${toUrl(title)}`)

export const fetchArticlePublic = () => axios.get(`/api/article/public`)

export const fetchDraft = () => axios.get('/api/draft')

export const saveArticle = convertPromise((data: {
    title: string,
    content: any,
    tags: any,
    status: boolean
  },
  id?: number | string
) => id === undefined ? axios.post('/api/article', data) : axios.put(`/api/article/${id}`, data))


// import { DICTIONARY, setDictionary } from 'Data/dictionary'
// import { KEYS } from 'Data/key'

// export const checkDictionary = (fn: Function) => (key: string) =>
//   DICTIONARY.has(key) ?
//     DICTIONARY.get(key) :
//     fn(key)
//     .then(
//       (res: any) => (setDictionary(KEYS.ARTICLE)(res.data), res),
//       (_: any) => ({data: {title: 'NOT FOUND', content: 'HA HA'}})
//     )

// export const toUrl = (str: string) => str.replace(/\s/g, '_')
// export const toTitle = (str: string) => str.replace(/_/, ' ')
