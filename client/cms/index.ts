import axios from 'axios'
import { checkDictionary, toUrl } from './util'

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

export const fetchArticles = () => {
  return axios.get(`/api/article`)
}

export const fetchTags = () => {
  return axios.get('/api/tag')
}

export const fetchArticleTitle = checkDictionary((title: string ) => {
  return axios.get(`/api/article/${toUrl(title)}`)
})

export const fetchArticleRecent = (limit: number = 5, condition?: {attribute: string, target: string}) => {
  const base = `/api/article/recent?limit=${limit}`
  const url = condition ?
    base + `&condition[attribute]=${condition.attribute}&condition[target]=${condition.target}` : // can make it more complex later
    base

  return axios.get(url)
}

export const fetchArticleTag = checkDictionary((tag: string) => {
  return axios.get(`/api/tag/${toUrl(tag)}`)
}) // get back to this

export const postArticle = (data: object) => {
  return axios.post('/api/article')
}
