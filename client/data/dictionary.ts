import { toUrl } from '../cms/util'
import { KEYS } from './key'

export type payload = {
  local: boolean,
  data: object,
  url: string
}

export type sublist = Map<string, payload>
export type tag = Map<string, any>

export const ARTICLE: sublist= new Map([
  ['ARTICLE1', {
    local: true,
    data: {
      title: 'ARTICLE1',
      content: 'bleh bleh bleh article1'
    },
    url: '/entry/ARTICLE1'
  }],
  ['ARTICLE2',{
    local: true,
    data: {
      title: 'ARTICLE2',
      content: 'bleh bleh bleh article2'
    },
    url: ''
  }],
  ['ARTICLE3', {
    local: true,
    data: {
      title: 'ARTICLE3',
      content: 'bleh bleh bleh article3'
    },
    url: ''
  }]
])

export const PROJECT: sublist = new Map([
  ['AUDIOSPHERE', {
    local: false,
    data: {
      title: 'AUDIOSPHERE',
      content: 'bleh bleh bleh audiosphere burhhhhh'
    },
    url: 'https://audiosphere.herokuapp.com/'
  }],
  ['STACKQUEST',{
    local: false,
    data: {
      title: 'STACKQUEST',
      content: 'bleh bleh bleh STACKQUEST'
    },
    url: 'http://stackquest.herokuapp.com/'
  }],
  ['PORTFOLIO', {
    local: false,
    data: {
      title: 'PORTFOLIO',
      content: 'bleh bleh bleh PORTFOLIO'
    },
    url: 'http://www.kskido.me/'
  }]
])

export const CONTACT: sublist = new Map([
  ['GITHUB', {
    local: false,
    data: {},
    url: ''
  }],
  ['LINKEDIN',{
    local: false,
    data: {},
    url: ''
  }],
  ['FACEBOOK', {
    local: false,
    data: {},
    url: ''
  }]
])

export const DICTIONARY = new Map([[KEYS.ARTICLE, ARTICLE], [KEYS.PROJECT, PROJECT], [KEYS.CONTACT, CONTACT]])

export const setDictionary = (key: string) => {
  const _dictionary = DICTIONARY.get(key) || ((map) =>(DICTIONARY.set(key, map), map))(new Map())

  return (data: {title: string, content: string, [key: string]: any}) =>
    _dictionary.set(data.title.toUpperCase(), {
        local: true,
        data,
        url: `/entry/${toUrl(data.title)}`
      })
}

