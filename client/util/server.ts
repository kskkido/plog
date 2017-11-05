import axios from 'axios'

export type article = {
  title: string,
  content: string,
  [key: string]: any
}

export type tag = {
  tagName: string,
  [key: string]: any
}

export type data = article | tag

export type fetched = Promise<data | data[]>

export const fetchArticles = () => axios.get(`/api/article`)

export const fetchTags = () => axios.get('/api/tag')

export const fetchArticleId = (id: number | string) => axios.get(`/api/article/${id}`)

export const fetchArticleTitle = (title: string ) => axios.get(`/api/article/${toUrl(title)}`)

export const fetchArticlePublic = () => axios.get(`/api/article/public`)

export const fetchArticleTag = (tag: string) => axios.get(`/api/tag/${toUrl(tag)}`)

export const fetchDraft = () => axios.get('/api/draft')

export const saveArticle = (data: {
    title: string,
    content: any,
    tags: any,
    status: boolean
  },
  id?: number | string
) => id === undefined ? axios.post('/api/article', data) : axios.put(`/api/article/${id}`, data)


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
