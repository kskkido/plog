import axios from 'axios'
import { convertFromRaw } from 'draft-js'

const createConvert = (fnConvert: Function) => (fnPromise: Function) => (...args: any[]) =>
  fnPromise(...args)
    .then((res: any) => fnConvert(res))

const convertArticle = (article: object) => {
  const { content } = article

  article.content = convertFromRaw(JSON.parse(content))]
  article.tags = article.tags || []
  return article
}

const convertArticles = (res: any) => {
  const { data } = res

  return Object.assign(res, {
    data: Array.isArray(data) ?
      data.map(convertArticle) :
      convertArticle(data)
  })
}

const convertPayloadArticles = createConvert(convertArticles)

export const fetchArticles = convertPayloadArticles(() => axios.get(`/api/article`))
export const fetchArticleId = convertPayloadArticles((id: number | string) => axios.get(`/api/article/${id}`))
export const fetchArticlePublic = convertPayloadArticles(() => axios.get(`/api/article/public`))

export const fetchTags = () => axios.get('/api/tag')

export const fetchTag = (tagName: String) => axios.get(`/api/tag/${tagName}`)

export const fetchDraft = () => axios.get('/api/draft')

export const saveArticle = convertPayloadArticles((data: {
    title: string,
    content: any,
    tags: any,
    status: boolean
  },
  id?: number | string
) => id === undefined ? axios.post('/api/article', data) : axios.put(`/api/article/${id}`, data))
