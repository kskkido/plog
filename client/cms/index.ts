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

export const fetchArticleId = (id: number | string) => {
  return axios.get(`api/article/${id}`)
}

export const fetchArticleTitle = checkDictionary((title: string ) => {
  return axios.get(`/api/article/${toUrl(title)}`)
})

export const fetchArticlePublic = () => {

  return axios.get(`/api/article/public`)
}

export const fetchArticleTag = checkDictionary((tag: string) => {
  return axios.get(`/api/tag/${toUrl(tag)}`)
}) // get back to this

export const fetchDraft = () => {
  return axios.get('/api/draft')
}

export const saveArticle = (data: {
    title: string,
    content: any,
    tags: any,
    status: boolean
  },
  id?: number | string
) => id === undefined ? axios.post('/api/article', data) : axios.put(`/api/article/${id}`, data)
