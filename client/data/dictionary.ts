import { KEYS } from './key'

export type entry = {
  local: boolean,
  data: object,
  url: string
}

export type sublist = Map<string, entry>
export type tag = Map<string, any>

export const ARTICLE: sublist= new Map([
  ['ARTICLE1', {
    local: true,
    data: {
      title: 'ARTICLE1',
      preview: 'bleh bleh bleh article1'
    },
    url: '/entry/ARTICLE1'
  }],
  ['ARTICLE2',{
    local: true,
    data: {
      title: 'ARTICLE2',
      preview: 'bleh bleh bleh article2'
    },
    url: ''
  }],
  ['ARTICLE3', {
    local: true,
    data: {
      title: 'ARTICLE3',
      preview: 'bleh bleh bleh article3'
    },
    url: ''
  }]
])

export const PROJECT: sublist = new Map([
  ['AUDIOSPHERE', {
    local: false,
    data: {
      title: 'AUDIOSPHERE',
      preview: 'bleh bleh bleh audiosphere burhhhhh'
    },
    url: 'https://audiosphere.herokuapp.com/'
  }],
  ['STACKQUEST',{
    local: false,
    data: {
      title: 'STACKQUEST',
      preview: 'bleh bleh bleh STACKQUEST'
    },
    url: 'http://stackquest.herokuapp.com/'
  }],
  ['PORTFOLIO', {
    local: false,
    data: {
      title: 'PORTFOLIO',
      preview: 'bleh bleh bleh PORTFOLIO'
    },
    url: 'http://www.kskido.me/'
  }]
])

export const CONTACT: sublist = new Map([
  ['GITHUB', {
    local: false,
    data: {title: 'GITHUB'},
    url: ''
  }],
  ['LINKEDIN',{
    local: false,
    data: {title: 'LINKEDIN'},
    url: ''
  }],
  ['FACEBOOK', {
    local: false,
    data: {title: 'FACEBOOK'},
    url: ''
  }]
])

// export const DICTIONARY = new Map([[KEYS.ARTICLE, ARTICLE], [KEYS.PROJECT, PROJECT], [KEYS.CONTACT, CONTACT]])

// export const setDictionary = (key: string) => {
//   const _dictionary = DICTIONARY.get(key) || ((map) =>(DICTIONARY.set(key, map), map))(new Map())

//   return (data: {title: string, content: string, [key: string]: any}) =>
//     _dictionary.set(data.title.toUpperCase(), {
//         local: true,
//         data,
//         url: `/entry/${toUrl(data.title)}`
//       })
// }

