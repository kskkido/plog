import axios from 'axios'

export const fetchArticles = () => {
  return axios.get(`/api/article`)
}

export const fetchArticle = (param: string | number) => {
  const type = typeof param === 'string' ? 'tag' : 'article'

  return axios.get(`/api/${type}/${param}`)
}

export const postArticle = (data: object) => {
  return axios.post('/api/article')
}

export const fetchTags = () => {
  return axios.get('/api/tag')
}
