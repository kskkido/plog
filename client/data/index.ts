import * as axios from 'axios'
import { RootState } from '../reducers'
import { actionCreators as fetchActions, FETCH_COMPLETE, State as FetchState } from '../reducers/fetch'
import { ActionCreator, Dispatch } from '../reducers/utils'

export type navigation = Map<string, {activeIndex: number, subList: string[]}>

export const NAVIGATION: navigation = new Map([
  ['RECENT', {
    activeIndex: 0,
    subList: ['most recent 1', 'most recent 2', 'most recent 3', 'most recent 4']
  }],
  ['ARTICLE', {
    activeIndex: 0,
    subList: ['article1', 'article2', 'article3']
  }],
  ['PROJECT', {
    activeIndex: 0,
    subList: ['Audiosphere', 'Stackquest', 'Portfolio']
  }],
  ['CONTACT', {
    activeIndex: 0,
    subList: ['github', 'linkedin', 'gmail']
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
