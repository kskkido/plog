import * as axios from 'axios'
import { ARTICLE, PROJECT, CONTACT } from './dictionary'
import { KEYS } from './key'

export type subList = {
  activeIndex: number,
  subList: string[]
}
export type navigation = Map<string, subList>

export interface navigationKeys {
  RECENT: string,
  ARTICLE: string,
  PROJECT: string,
  CONTACT: string
}

export const NAVIGATION: navigation = new Map([
  [KEYS.RECENT, {
    activeIndex: 0,
    subList: []
  }],
  [KEYS.ARTICLE, {
    activeIndex: 0,
    subList: Array.from(ARTICLE.keys())
  }],
  [KEYS.PROJECT, {
    activeIndex: 0,
    subList: Array.from(PROJECT.keys())
  }],
  [KEYS.CONTACT, {
    activeIndex: 0,
    subList: Array.from(CONTACT.keys())
  }]
])

/*
  Start content management, once website scaffolding is complete

  Content initialization
  -> Upon html request, fetch data from cms or local server
  -> Define navigation map object like above
    -> Since project and contact is most likely static, the incoming data will be merged with these keys
  -> Use the map to intialize publisher

  example implementation:

  fetchData(url)
    .then(data => new Map(data, projectAndContact))
    .then(() => dispatch(fetchComplete))

  url -> /article/title_data

  getArticle(url) =>
    axios.get(`api/article/${url}`)
    .then

  postArticle(title) =>
    axios.post(`api/article/${url}, articlify)
*/
